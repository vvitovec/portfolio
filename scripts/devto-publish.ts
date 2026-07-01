import { config } from "dotenv";
import { Pool } from "pg";
import { z } from "zod";

config({ path: ".env", quiet: true });
config({ path: ".env.local", override: true, quiet: true });
if (process.env.BLOG_PUBLISH_ENV_FILE) {
  config({ path: process.env.BLOG_PUBLISH_ENV_FILE, override: true, quiet: true });
}
if (process.env.DEVTO_ENV_FILE) {
  config({ path: process.env.DEVTO_ENV_FILE, override: true, quiet: true });
}

const LOCALES = ["cs", "en"] as const;
const DEFAULT_SITE_URL = "https://www.vvitovec.com";
const DEFAULT_DEVTO_API_URL = "https://dev.to/api";
const DEFAULT_TAGS = ["webdev"];

const argsSchema = z.object({
  slug: z.string().trim().min(1),
  locale: z.enum(LOCALES).default("en"),
  dryRun: z.boolean().default(false),
  published: z.boolean().default(false),
  allowCreate: z.boolean().default(true),
  allowUpdate: z.boolean().default(true),
  devtoId: z.coerce.number().int().positive().optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  siteUrl: z.string().url().default(DEFAULT_SITE_URL),
  devtoApiUrl: z.string().url().default(DEFAULT_DEVTO_API_URL),
});

type Args = z.infer<typeof argsSchema>;

type BlogPostRow = {
  slug: string;
  status: string;
  tags: string[];
  coverImageUrl: string | null;
  title: string;
  excerpt: string | null;
  contentMarkdown: string;
  seoDescription: string | null;
  publishedAt: Date | string | null;
};

type DevtoArticleListItem = {
  id: number;
  title?: string;
  url?: string;
  canonical_url?: string | null;
  published?: boolean;
};

type DevtoArticleResponse = DevtoArticleListItem & {
  description?: string;
  body_markdown?: string;
};

type DevtoPayload = {
  article: {
    title: string;
    published: boolean;
    body_markdown: string;
    tags: string[];
    canonical_url: string;
    description?: string;
    main_image?: string;
  };
};

const usage = [
  "Usage: pnpm devto:publish --slug <blog-slug> [--locale en|cs] [--published|--draft] [--dry-run]",
  "",
  "Environment:",
  "  DEVTO_API_KEY             DEV/Forem API key. Not needed for --dry-run.",
  "  BLOG_PUBLISH_ENV_FILE    Optional env file for production DATABASE_URL.",
  "  DEVTO_ENV_FILE           Optional env file containing DEVTO_API_KEY.",
].join("\n");

const parseArgs = (): Args => {
  const raw = process.argv.slice(2);
  const values: Record<string, unknown> = {
    locale: "en",
    dryRun: false,
    published: false,
    allowCreate: true,
    allowUpdate: true,
  };
  const tags: string[] = [];

  for (let index = 0; index < raw.length; index += 1) {
    const arg = raw[index];
    const next = raw[index + 1];

    switch (arg) {
      case "--help":
      case "-h":
        console.log(usage);
        process.exit(0);
      case "--slug":
        values.slug = next;
        index += 1;
        break;
      case "--locale":
        values.locale = next;
        index += 1;
        break;
      case "--dry-run":
        values.dryRun = true;
        break;
      case "--published":
        values.published = true;
        break;
      case "--draft":
        values.published = false;
        break;
      case "--no-create":
        values.allowCreate = false;
        break;
      case "--no-update":
        values.allowUpdate = false;
        break;
      case "--devto-id":
        values.devtoId = next;
        index += 1;
        break;
      case "--tag":
        if (next) {
          tags.push(next);
        }
        index += 1;
        break;
      case "--site-url":
        values.siteUrl = next;
        index += 1;
        break;
      case "--devto-api-url":
        values.devtoApiUrl = next;
        index += 1;
        break;
      default:
        throw new Error(`Unknown argument: ${arg}\n\n${usage}`);
    }
  }

  if (tags.length > 0) {
    values.tags = tags;
  }

  return argsSchema.parse(values);
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/g, "");

const getDatabaseConnectionString = () => {
  const databaseUrl = process.env.DATABASE_URL;
  const acceptSelfSigned =
    process.env.PRISMA_PG_ACCEPT_SELF_SIGNED === "true" ||
    process.env.PG_SSL_REJECT_UNAUTHORIZED === "false";

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  if (!acceptSelfSigned) {
    return databaseUrl;
  }

  try {
    const parsed = new URL(databaseUrl);
    parsed.searchParams.delete("sslmode");
    return parsed.toString();
  } catch {
    return databaseUrl.replace(/([?&])sslmode=[^&]+&?/, "$1").replace(/[?&]$/, "");
  }
};

const createPool = () => {
  const acceptSelfSigned =
    process.env.PRISMA_PG_ACCEPT_SELF_SIGNED === "true" ||
    process.env.PG_SSL_REJECT_UNAUTHORIZED === "false";

  return new Pool({
    connectionString: getDatabaseConnectionString(),
    connectionTimeoutMillis: 10_000,
    ...(acceptSelfSigned ? { ssl: { rejectUnauthorized: false } } : {}),
  });
};

const getBlogPost = async (pool: Pool, slug: string, locale: Args["locale"]) => {
  const result = await pool.query<BlogPostRow>(
    `
      SELECT
        p."slug",
        p."status",
        p."tags",
        p."coverImageUrl",
        p."publishedAt",
        t."title",
        t."excerpt",
        t."seoDescription",
        t."contentMarkdown"
      FROM "BlogPost" p
      JOIN "BlogPostTranslation" t ON t."postId" = p."id"
      WHERE p."slug" = $1 AND t."locale" = $2::"Locale"
      LIMIT 1
    `,
    [slug, locale],
  );

  const post = result.rows[0];
  if (!post) {
    throw new Error(`No ${locale} blog post found for slug "${slug}".`);
  }

  if (post.status !== "PUBLISHED") {
    throw new Error(`Blog post "${slug}" is ${post.status}; only published posts should be cross-posted.`);
  }

  return post;
};

const absolutizeMarkdownUrls = (markdown: string, siteUrl: string) => {
  const base = trimTrailingSlash(siteUrl);

  return markdown
    .replace(/(\]\()\/(?!\/)/g, `$1${base}/`)
    .replace(/(<a\s+[^>]*href=["'])\/(?!\/)/gi, `$1${base}/`)
    .replace(/(<img\s+[^>]*src=["'])\/(?!\/)/gi, `$1${base}/`);
};

const normalizeTag = (tag: string) =>
  tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 30);

const normalizeTags = (tags: string[]) => {
  const normalized = tags.map(normalizeTag).filter(Boolean);
  return Array.from(new Set(normalized.length > 0 ? normalized : DEFAULT_TAGS)).slice(0, 4);
};

const createDevtoPayload = (post: BlogPostRow, args: Args): DevtoPayload => {
  const siteUrl = trimTrailingSlash(args.siteUrl);
  const canonicalUrl = `${siteUrl}/${args.locale}/blog/${post.slug}`;
  const description = post.excerpt ?? post.seoDescription ?? undefined;

  return {
    article: {
      title: post.title,
      published: args.published,
      body_markdown: absolutizeMarkdownUrls(post.contentMarkdown, siteUrl),
      tags: normalizeTags(args.tags ?? post.tags),
      canonical_url: canonicalUrl,
      ...(description ? { description } : {}),
      ...(post.coverImageUrl ? { main_image: post.coverImageUrl } : {}),
    },
  };
};

const redactPayloadForOutput = (payload: DevtoPayload) => ({
  article: {
    ...payload.article,
    body_markdown: `${payload.article.body_markdown.slice(0, 600)}${
      payload.article.body_markdown.length > 600 ? "\n\n...[truncated]" : ""
    }`,
    body_markdown_length: payload.article.body_markdown.length,
  },
});

const getDevtoApiKey = () => {
  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) {
    throw new Error("DEVTO_API_KEY is not set.");
  }
  return apiKey;
};

const devtoRequest = async <T>({
  args,
  path,
  method,
  payload,
}: {
  args: Args;
  path: string;
  method: "GET" | "POST" | "PUT";
  payload?: DevtoPayload;
}): Promise<T> => {
  const response = await fetch(`${trimTrailingSlash(args.devtoApiUrl)}${path}`, {
    method,
    headers: {
      "api-key": getDevtoApiKey(),
      "content-type": "application/json",
    },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`DEV API ${method} ${path} failed: ${response.status} ${text}`);
  }

  return data as T;
};

const getAllDevtoArticles = async (args: Args) => {
  const articles: DevtoArticleListItem[] = [];

  for (let page = 1; page <= 20; page += 1) {
    const pageArticles = await devtoRequest<DevtoArticleListItem[]>({
      args,
      path: `/articles/me/all?page=${page}&per_page=100`,
      method: "GET",
    });

    articles.push(...pageArticles);
    if (pageArticles.length < 100) {
      break;
    }
  }

  return articles;
};

const findExistingDevtoArticle = async (args: Args, payload: DevtoPayload) => {
  if (args.devtoId) {
    return { id: args.devtoId };
  }

  const articles = await getAllDevtoArticles(args);
  return articles.find(
    (article) =>
      article.canonical_url === payload.article.canonical_url ||
      article.title?.trim().toLowerCase() === payload.article.title.trim().toLowerCase(),
  );
};

const publishToDevto = async (args: Args, payload: DevtoPayload) => {
  const existingArticle = await findExistingDevtoArticle(args, payload);

  if (existingArticle) {
    if (!args.allowUpdate) {
      throw new Error(`DEV article ${existingArticle.id} already exists and --no-update was set.`);
    }

    const article = await devtoRequest<DevtoArticleResponse>({
      args,
      path: `/articles/${existingArticle.id}`,
      method: "PUT",
      payload,
    });

    return {
      action: "updated",
      id: article.id,
      url: article.url,
      canonicalUrl: article.canonical_url,
      published: article.published,
    };
  }

  if (!args.allowCreate) {
    throw new Error("No matching DEV article exists and --no-create was set.");
  }

  const article = await devtoRequest<DevtoArticleResponse>({
    args,
    path: "/articles",
    method: "POST",
    payload,
  });

  return {
    action: "created",
    id: article.id,
    url: article.url,
    canonicalUrl: article.canonical_url,
    published: article.published,
  };
};

const main = async () => {
  const args = parseArgs();
  const pool = createPool();

  try {
    const post = await getBlogPost(pool, args.slug, args.locale);
    const payload = createDevtoPayload(post, args);

    if (args.dryRun) {
      console.log(
        JSON.stringify(
          {
            dryRun: true,
            slug: post.slug,
            locale: args.locale,
            payload: redactPayloadForOutput(payload),
          },
          null,
          2,
        ),
      );
      return;
    }

    const result = await publishToDevto(args, payload);
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await pool.end();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
