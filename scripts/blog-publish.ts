import crypto from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { put } from "@vercel/blob";
import { config } from "dotenv";
import { Pool } from "pg";
import { z } from "zod";

config({ path: ".env", quiet: true });
config({ path: ".env.local", override: true, quiet: true });
if (process.env.BLOG_PUBLISH_ENV_FILE) {
  config({ path: process.env.BLOG_PUBLISH_ENV_FILE, override: true, quiet: true });
}

const LOCALES = ["cs", "en"] as const;
const MAX_UPLOAD_SIZE_BYTES = 4.5 * 1024 * 1024;
const IMAGE_TYPES_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const slugify = (input: string) =>
  input
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const trimTrailingSlash = (value: string) => value.replace(/\/+$/g, "");
const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : null))
  .nullable()
  .optional();

const translationSchema = z.object({
  title: z.string().trim().min(1).max(180),
  excerpt: optionalText,
  contentMarkdown: z.string().trim().min(1).max(30000),
  seoTitle: optionalText,
  seoDescription: optionalText,
  coverImageAlt: optionalText,
  coverImageCaption: optionalText,
});

const postSchema = z.object({
  id: z.string().trim().min(1).regex(/^[A-Za-z0-9_-]+$/).optional(),
  slug: z.string().trim().min(1).max(120),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  tags: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
  coverImageUrl: z.string().trim().min(1).max(500).optional(),
  coverImagePath: z.string().trim().min(1).optional(),
  coverImageCredit: optionalText,
  coverImageCreditUrl: optionalText,
  publishedAt: z.string().datetime().optional(),
});

const payloadSchema = z.object({
  post: postSchema,
  translations: z.object({
    cs: translationSchema,
    en: translationSchema,
  }),
});

type Payload = z.infer<typeof payloadSchema>;
type Post = z.infer<typeof postSchema>;
type Translation = z.infer<typeof translationSchema>;
type Translations = Record<(typeof LOCALES)[number], Translation>;

type Args = {
  payloadPath: string;
  dryRun: boolean;
  skipImage: boolean;
  skipRevalidate: boolean;
};

const parseArgs = (): Args => {
  const args = process.argv.slice(2);
  const payloadPath = args.find((arg) => !arg.startsWith("--"));

  if (!payloadPath || args.includes("--help")) {
    console.log(
      [
        "Usage: pnpm blog:publish <payload.json> [--dry-run] [--skip-image] [--skip-revalidate]",
        "",
        "The payload must include post plus cs/en translations.",
        "For published posts, include coverImageUrl or coverImagePath and at least one Markdown link per locale.",
      ].join("\n"),
    );
    process.exit(payloadPath ? 0 : 1);
  }

  return {
    payloadPath,
    dryRun: args.includes("--dry-run"),
    skipImage: args.includes("--skip-image"),
    skipRevalidate: args.includes("--skip-revalidate"),
  };
};

const normalizePost = (post: Post): Post => ({
  ...post,
  id: post.id ?? `blog-${slugify(post.slug)}`,
  slug: slugify(post.slug),
  tags: Array.from(new Set(post.tags.map((tag) => tag.trim()).filter(Boolean))),
});

const hasMarkdownLink = (markdown: string) =>
  /\[[^\]]+\]\((https?:\/\/|\/)[^)]+\)/.test(markdown);

const assertPostCompleteness = (post: Post, translations: Translations) => {
  if (!post.slug) {
    throw new Error("Blog post slug could not be generated.");
  }

  if (post.status !== "PUBLISHED") {
    return;
  }

  if (!post.coverImageUrl && !post.coverImagePath) {
    throw new Error("Published blog posts need coverImageUrl or coverImagePath.");
  }

  for (const locale of LOCALES) {
    const translation = translations[locale];
    if (!translation.excerpt) {
      throw new Error(`${locale} translation needs an excerpt.`);
    }
    if (!translation.coverImageAlt) {
      throw new Error(`${locale} translation needs coverImageAlt.`);
    }
    if (!hasMarkdownLink(translation.contentMarkdown)) {
      throw new Error(`${locale} contentMarkdown needs at least one Markdown link.`);
    }
  }
};

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

const getBlobToken = () => {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }

  const matchingKey = Object.keys(process.env).find(
    (key) => key.endsWith("BLOB_READ_WRITE_TOKEN") && process.env[key],
  );
  return matchingKey ? process.env[matchingKey] : undefined;
};

const hasSelfHostedStorage = () =>
  Boolean(
    process.env.SELF_HOSTED_STORAGE_BASE_URL &&
      process.env.SELF_HOSTED_STORAGE_SERVICE_KEY &&
      process.env.SELF_HOSTED_STORAGE_BUCKET,
  );

const getSelfHostedStorage = () => {
  const baseUrl = process.env.SELF_HOSTED_STORAGE_BASE_URL;
  const serviceKey = process.env.SELF_HOSTED_STORAGE_SERVICE_KEY;
  const bucket = process.env.SELF_HOSTED_STORAGE_BUCKET;

  if (!baseUrl || !serviceKey || !bucket) {
    throw new Error("Missing self-hosted storage configuration.");
  }

  return {
    baseUrl: trimTrailingSlash(baseUrl),
    serviceKey,
    bucket: trimSlashes(bucket),
  };
};

const resolveImage = async (inputPath: string, payloadDir: string) => {
  const absolutePath = path.isAbsolute(inputPath)
    ? inputPath
    : path.resolve(payloadDir, inputPath);
  const extension = path.extname(absolutePath).slice(1).toLowerCase();
  const contentType = IMAGE_TYPES_BY_EXTENSION[extension];

  if (!contentType) {
    throw new Error(`Unsupported image type: ${inputPath}`);
  }

  const fileStat = await stat(absolutePath);
  if (fileStat.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error(`Image exceeds 4.5MB upload limit: ${inputPath}`);
  }

  const body = await readFile(absolutePath);
  const hash = crypto.createHash("sha256").update(body).digest("hex").slice(0, 12);
  const baseName =
    slugify(path.basename(absolutePath, path.extname(absolutePath))) || "image";

  return {
    body,
    contentType,
    fileName: `${baseName}-${hash}.${extension === "jpeg" ? "jpg" : extension}`,
  };
};

const uploadImage = async ({
  inputPath,
  payloadDir,
  pathnamePrefix,
}: {
  inputPath: string;
  payloadDir: string;
  pathnamePrefix: string;
}) => {
  const image = await resolveImage(inputPath, payloadDir);
  const pathname = `${trimSlashes(pathnamePrefix)}/${image.fileName}`;

  if (hasSelfHostedStorage()) {
    const storage = getSelfHostedStorage();
    const response = await fetch(
      `${storage.baseUrl}/object/${storage.bucket}/${pathname}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${storage.serviceKey}`,
          apikey: storage.serviceKey,
          "content-type": image.contentType,
          "x-upsert": "true",
        },
        body: image.body,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(
        `Self-hosted upload failed for ${inputPath}: ${response.status} ${await response.text()}`,
      );
    }

    return `${storage.baseUrl}/object/public/${storage.bucket}/${pathname}`;
  }

  const token = getBlobToken();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set.");
  }

  const blob = await put(pathname, image.body, {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: image.contentType,
  });

  return blob.url;
};

const uploadCoverImage = async (
  post: Post,
  payloadDir: string,
  skipImage: boolean,
) => {
  if (skipImage || post.coverImageUrl || !post.coverImagePath) {
    return;
  }

  post.coverImageUrl = await uploadImage({
    inputPath: post.coverImagePath,
    payloadDir,
    pathnamePrefix: `blog/${post.id ?? `blog-${post.slug}`}/cover`,
  });
};

const upsertBlogPost = async (
  pool: Pool,
  post: Post,
  translations: Translations,
) => {
  const postResult = await pool.query<{ id: string; slug: string }>(
    `
      INSERT INTO "BlogPost" (
        "id", "slug", "status", "featured", "tags", "coverImageUrl",
        "coverImageCredit", "coverImageCreditUrl", "createdAt", "updatedAt",
        "publishedAt"
      )
      VALUES (
        $1, $2, $3::"BlogPostStatus", $4, $5, $6, $7, $8,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        CASE
          WHEN $3::"BlogPostStatus" = 'PUBLISHED'::"BlogPostStatus"
          THEN COALESCE($9::timestamp, CURRENT_TIMESTAMP)
          ELSE NULL
        END
      )
      ON CONFLICT ("slug") DO UPDATE
      SET
        "status" = EXCLUDED."status",
        "featured" = EXCLUDED."featured",
        "tags" = EXCLUDED."tags",
        "coverImageUrl" = EXCLUDED."coverImageUrl",
        "coverImageCredit" = EXCLUDED."coverImageCredit",
        "coverImageCreditUrl" = EXCLUDED."coverImageCreditUrl",
        "publishedAt" = CASE
          WHEN EXCLUDED."status" = 'PUBLISHED'::"BlogPostStatus"
          THEN COALESCE("BlogPost"."publishedAt", EXCLUDED."publishedAt", CURRENT_TIMESTAMP)
          ELSE NULL
        END,
        "updatedAt" = CURRENT_TIMESTAMP
      RETURNING "id", "slug"
    `,
    [
      post.id,
      post.slug,
      post.status,
      post.featured,
      post.tags,
      post.coverImageUrl ?? null,
      post.coverImageCredit ?? null,
      post.coverImageCreditUrl ?? null,
      post.publishedAt ?? null,
    ],
  );

  const insertedPost = postResult.rows[0];
  if (!insertedPost) {
    throw new Error("Blog post upsert returned no row.");
  }

  for (const locale of LOCALES) {
    const translation = translations[locale];
    await pool.query(
      `
        INSERT INTO "BlogPostTranslation" (
          "id", "postId", "locale", "title", "excerpt", "contentMarkdown",
          "seoTitle", "seoDescription", "coverImageAlt", "coverImageCaption",
          "createdAt", "updatedAt"
        )
        VALUES (
          $1, $2, $3::"Locale", $4, $5, $6, $7, $8, $9, $10,
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )
        ON CONFLICT ("postId", "locale") DO UPDATE
        SET
          "title" = EXCLUDED."title",
          "excerpt" = EXCLUDED."excerpt",
          "contentMarkdown" = EXCLUDED."contentMarkdown",
          "seoTitle" = EXCLUDED."seoTitle",
          "seoDescription" = EXCLUDED."seoDescription",
          "coverImageAlt" = EXCLUDED."coverImageAlt",
          "coverImageCaption" = EXCLUDED."coverImageCaption",
          "updatedAt" = CURRENT_TIMESTAMP
      `,
      [
        `${insertedPost.id}-${locale}`,
        insertedPost.id,
        locale,
        translation.title,
        translation.excerpt ?? null,
        translation.contentMarkdown,
        translation.seoTitle ?? null,
        translation.seoDescription ?? null,
        translation.coverImageAlt ?? null,
        translation.coverImageCaption ?? null,
      ],
    );
  }

  return insertedPost;
};

const maybeRevalidate = async (slug: string) => {
  const secret = process.env.PORTFOLIO_REVALIDATE_SECRET;
  const baseUrl =
    process.env.PORTFOLIO_REVALIDATE_BASE_URL ??
    process.env.NEXTAUTH_URL ??
    "https://www.vvitovec.com";

  if (!secret) {
    console.log("Skipped revalidate: PORTFOLIO_REVALIDATE_SECRET is not set.");
    return;
  }

  const response = await fetch(
    `${trimTrailingSlash(baseUrl)}/api/internal/revalidate-portfolio`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        slug,
        projects: false,
        websites: false,
        blog: true,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Revalidate failed: ${response.status} ${await response.text()}`);
  }

  console.log("Revalidated public blog cache.");
};

const main = async () => {
  const args = parseArgs();
  const payloadPath = path.resolve(args.payloadPath);
  const payloadDir = path.dirname(payloadPath);
  const rawPayload = JSON.parse(await readFile(payloadPath, "utf8")) as Payload;
  const payload = payloadSchema.parse(rawPayload);
  const post = normalizePost(payload.post);

  await uploadCoverImage(post, payloadDir, args.skipImage);
  assertPostCompleteness(post, payload.translations);

  if (args.dryRun) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          post,
          translations: payload.translations,
        },
        null,
        2,
      ),
    );
    return;
  }

  const pool = createPool();
  try {
    const saved = await upsertBlogPost(pool, post, payload.translations);
    console.log(`Saved blog post ${saved.slug} (${saved.id}).`);

    if (!args.skipRevalidate) {
      await maybeRevalidate(saved.slug);
    }
  } finally {
    await pool.end();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
