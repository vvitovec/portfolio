import crypto from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { put } from "@vercel/blob";
import { config } from "dotenv";
import { Pool } from "pg";
import { z } from "zod";

config({ path: ".env", quiet: true });
config({ path: ".env.local", override: true, quiet: true });

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

const imageBlockSchema = z.object({
  id: z.string().trim().min(1).max(128),
  type: z.literal("image"),
  title: optionalText,
  body: optionalText,
  imageUrl: z.string().trim().min(1).max(500).optional(),
  imagePath: z.string().trim().min(1).optional(),
  caption: optionalText,
  layout: z.enum(["left", "right", "full"]).optional(),
});

const caseStudyBlockSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().trim().min(1).max(128),
    type: z.enum(["problem", "solution"]),
    title: optionalText,
    body: z.string().trim().min(1).max(4000),
  }),
  z.object({
    id: z.string().trim().min(1).max(128),
    type: z.literal("outcome"),
    title: optionalText,
    body: optionalText,
    bullets: z.array(z.string().trim().min(1).max(140)).max(10).optional(),
  }),
  imageBlockSchema,
]);

const translationSchema = z.object({
  title: z.string().trim().min(1).max(160),
  tagline: optionalText,
  descriptionShort: optionalText,
  descriptionLong: optionalText,
  role: optionalText,
  highlights: z.array(z.string().trim().min(1).max(200)).max(8).default([]),
  caseStudyBlocks: z.array(caseStudyBlockSchema).max(20),
});

const projectSchema = z.object({
  id: z.string().trim().min(1).regex(/^[A-Za-z0-9_-]+$/).optional(),
  slug: z.string().trim().min(1).max(120),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  featured: z.boolean().default(false),
  year: z.number().int().min(1900).max(2100).nullable().optional(),
  coverImageUrl: z.string().trim().min(1).max(500).optional(),
  coverImagePath: z.string().trim().min(1).optional(),
  galleryImageUrls: z.array(z.string().trim().min(1).max(500)).default([]),
  galleryImagePaths: z.array(z.string().trim().min(1)).default([]),
  liveUrl: optionalText,
  repoUrl: optionalText,
  techStack: z.array(z.string().trim().min(1).max(100)).max(12).default([]),
  publishedAt: z.string().datetime().optional(),
});

const websiteSchema = z.object({
  id: z.string().trim().min(1).regex(/^[A-Za-z0-9_-]+$/).optional(),
  name: z.string().trim().min(1).max(160),
  url: z.string().trim().url().max(500),
  category: z.string().trim().min(1).max(120),
  description: optionalText,
  sortOrder: z.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  publishedAt: z.string().datetime().optional(),
});

const payloadSchema = z
  .object({
    website: websiteSchema.optional(),
    project: projectSchema.optional(),
    translations: z
      .object({
        cs: translationSchema,
        en: translationSchema,
      })
      .optional(),
  })
  .refine((payload) => payload.website || payload.project, {
    message: "Payload needs at least website or project.",
  })
  .refine((payload) => !payload.project || payload.translations, {
    message: "Project payload needs cs and en translations.",
  });

type CaseStudyBlock = z.infer<typeof caseStudyBlockSchema>;
type ImageBlock = z.infer<typeof imageBlockSchema>;
type Payload = z.infer<typeof payloadSchema>;
type Project = z.infer<typeof projectSchema>;
type Translation = z.infer<typeof translationSchema>;
type Translations = Record<(typeof LOCALES)[number], Translation>;

type Args = {
  payloadPath: string;
  dryRun: boolean;
  skipImages: boolean;
  skipRevalidate: boolean;
};

const parseArgs = (): Args => {
  const args = process.argv.slice(2);
  const payloadPath = args.find((arg) => !arg.startsWith("--"));

  if (!payloadPath || args.includes("--help")) {
    console.log(
      [
        "Usage: pnpm portfolio:publish <payload.json> [--dry-run] [--skip-images] [--skip-revalidate]",
        "",
        "The payload may contain a website, a project with translations, or both.",
        "Image paths are resolved relative to the payload file.",
      ].join("\n"),
    );
    process.exit(payloadPath ? 0 : 1);
  }

  return {
    payloadPath,
    dryRun: args.includes("--dry-run"),
    skipImages: args.includes("--skip-images"),
    skipRevalidate: args.includes("--skip-revalidate"),
  };
};

const normalizeProject = (project: Project): Project => ({
  ...project,
  id: project.id ?? `project-${slugify(project.slug)}`,
  slug: slugify(project.slug),
});

const assertProjectCompleteness = (
  project: Project,
  translations: Translations | undefined,
) => {
  if (!translations) {
    throw new Error("Project payload needs translations.");
  }

  if (project.status === "PUBLISHED" && !project.coverImageUrl && !project.coverImagePath) {
    throw new Error("Published project needs coverImageUrl or coverImagePath.");
  }

  for (const locale of LOCALES) {
    const blocks = translations[locale].caseStudyBlocks;
    const hasImageBlock = blocks.some(
      (block) =>
        block.type === "image" &&
        (block.imageUrl || (block as ImageBlock).imagePath),
    );
    if (!hasImageBlock) {
      throw new Error(`${locale} caseStudyBlocks needs at least one image block.`);
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
  const baseName = slugify(path.basename(absolutePath, path.extname(absolutePath))) || "image";

  return {
    body,
    contentType,
    extension: extension === "jpeg" ? "jpg" : extension,
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

const uploadProjectImages = async (
  project: Project,
  translations: Translations,
  payloadDir: string,
) => {
  const projectId = project.id ?? `project-${project.slug}`;

  if (project.coverImagePath && !project.coverImageUrl) {
    project.coverImageUrl = await uploadImage({
      inputPath: project.coverImagePath,
      payloadDir,
      pathnamePrefix: `projects/${projectId}/cover`,
    });
  }

  for (const imagePath of project.galleryImagePaths) {
    project.galleryImageUrls.push(
      await uploadImage({
        inputPath: imagePath,
        payloadDir,
        pathnamePrefix: `projects/${projectId}/gallery`,
      }),
    );
  }

  for (const locale of LOCALES) {
    translations[locale].caseStudyBlocks = await Promise.all(
      translations[locale].caseStudyBlocks.map(async (block): Promise<CaseStudyBlock> => {
        if (block.type !== "image") {
          return block;
        }

        if (block.imageUrl || !block.imagePath) {
          return block;
        }

        return {
          ...block,
          imageUrl: await uploadImage({
            inputPath: block.imagePath,
            payloadDir,
            pathnamePrefix: `projects/${projectId}/case-study/${locale}`,
          }),
        };
      }),
    );
  }
};

const stripImagePath = (block: CaseStudyBlock) => {
  if (block.type !== "image") {
    return block;
  }

  const { imagePath: _imagePath, ...cleanBlock } = block;
  return cleanBlock;
};

const upsertWebsite = async (pool: Pool, website: NonNullable<Payload["website"]>) => {
  const existing = await pool.query<{ id: string }>(
    'SELECT "id" FROM "Website" WHERE "url" = $1 ORDER BY "createdAt" ASC LIMIT 1',
    [website.url],
  );
  const publishedAt = website.status === "PUBLISHED" ? website.publishedAt ?? null : null;

  if (existing.rows[0]) {
    const updated = await pool.query<{ id: string; name: string }>(
      `
        UPDATE "Website"
        SET
          "name" = $2,
          "category" = $3,
          "description" = $4,
          "sortOrder" = $5,
          "status" = $6::"WebsiteStatus",
          "publishedAt" = CASE
            WHEN $6::"WebsiteStatus" = 'PUBLISHED'::"WebsiteStatus"
            THEN COALESCE("publishedAt", COALESCE($7::timestamp, CURRENT_TIMESTAMP))
            ELSE NULL
          END,
          "updatedAt" = CURRENT_TIMESTAMP
        WHERE "id" = $1
        RETURNING "id", "name"
      `,
      [
        existing.rows[0].id,
        website.name,
        website.category,
        website.description ?? null,
        website.sortOrder,
        website.status,
        publishedAt,
      ],
    );
    return updated.rows[0];
  }

  const created = await pool.query<{ id: string; name: string }>(
    `
      INSERT INTO "Website" (
        "id", "name", "url", "category", "description", "sortOrder",
        "status", "createdAt", "updatedAt", "publishedAt"
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7::"WebsiteStatus",
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        CASE
          WHEN $7::"WebsiteStatus" = 'PUBLISHED'::"WebsiteStatus"
          THEN COALESCE($8::timestamp, CURRENT_TIMESTAMP)
          ELSE NULL
        END
      )
      RETURNING "id", "name"
    `,
    [
      website.id ?? `website-${slugify(website.name)}`,
      website.name,
      website.url,
      website.category,
      website.description ?? null,
      website.sortOrder,
      website.status,
      publishedAt,
    ],
  );

  return created.rows[0];
};

const upsertProject = async (
  pool: Pool,
  project: Project,
  translations: Translations,
) => {
  const projectResult = await pool.query<{ id: string; slug: string }>(
    `
      INSERT INTO "Project" (
        "id", "slug", "status", "featured", "year", "coverImageUrl",
        "galleryImageUrls", "liveUrl", "repoUrl", "techStack",
        "createdAt", "updatedAt", "publishedAt"
      )
      VALUES (
        $1, $2, $3::"ProjectStatus", $4, $5, $6, $7, $8, $9, $10,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        CASE
          WHEN $3::"ProjectStatus" = 'PUBLISHED'::"ProjectStatus"
          THEN COALESCE($11::timestamp, CURRENT_TIMESTAMP)
          ELSE NULL
        END
      )
      ON CONFLICT ("slug") DO UPDATE
      SET
        "status" = EXCLUDED."status",
        "featured" = EXCLUDED."featured",
        "year" = EXCLUDED."year",
        "coverImageUrl" = EXCLUDED."coverImageUrl",
        "galleryImageUrls" = EXCLUDED."galleryImageUrls",
        "liveUrl" = EXCLUDED."liveUrl",
        "repoUrl" = EXCLUDED."repoUrl",
        "techStack" = EXCLUDED."techStack",
        "publishedAt" = CASE
          WHEN EXCLUDED."status" = 'PUBLISHED'::"ProjectStatus"
          THEN COALESCE("Project"."publishedAt", EXCLUDED."publishedAt", CURRENT_TIMESTAMP)
          ELSE NULL
        END,
        "updatedAt" = CURRENT_TIMESTAMP
      RETURNING "id", "slug"
    `,
    [
      project.id,
      project.slug,
      project.status,
      project.featured,
      project.year ?? null,
      project.coverImageUrl ?? null,
      project.galleryImageUrls,
      project.liveUrl ?? null,
      project.repoUrl ?? null,
      project.techStack,
      project.publishedAt ?? null,
    ],
  );

  const insertedProject = projectResult.rows[0];
  if (!insertedProject) {
    throw new Error("Project upsert returned no row.");
  }

  for (const locale of LOCALES) {
    const translation = translations[locale];
    await pool.query(
      `
        INSERT INTO "ProjectTranslation" (
          "id", "projectId", "locale", "title", "tagline",
          "descriptionShort", "descriptionLong", "caseStudyBlocks",
          "role", "highlights", "createdAt", "updatedAt"
        )
        VALUES (
          $1, $2, $3::"Locale", $4, $5, $6, $7, $8::jsonb, $9, $10,
          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )
        ON CONFLICT ("projectId", "locale") DO UPDATE
        SET
          "title" = EXCLUDED."title",
          "tagline" = EXCLUDED."tagline",
          "descriptionShort" = EXCLUDED."descriptionShort",
          "descriptionLong" = EXCLUDED."descriptionLong",
          "caseStudyBlocks" = EXCLUDED."caseStudyBlocks",
          "role" = EXCLUDED."role",
          "highlights" = EXCLUDED."highlights",
          "updatedAt" = CURRENT_TIMESTAMP
      `,
      [
        `${insertedProject.id}-${locale}`,
        insertedProject.id,
        locale,
        translation.title,
        translation.tagline ?? null,
        translation.descriptionShort ?? null,
        translation.descriptionLong ?? null,
        JSON.stringify(translation.caseStudyBlocks.map(stripImagePath)),
        translation.role ?? null,
        translation.highlights,
      ],
    );
  }

  return insertedProject;
};

const maybeRevalidate = async ({
  slug,
  hasWebsite,
  hasProject,
}: {
  slug?: string;
  hasWebsite: boolean;
  hasProject: boolean;
}) => {
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
        projects: hasProject,
        websites: hasWebsite,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Revalidate failed: ${response.status} ${await response.text()}`);
  }

  console.log("Revalidated public portfolio cache.");
};

const main = async () => {
  const args = parseArgs();
  const payloadFile = path.resolve(args.payloadPath);
  const payloadDir = path.dirname(payloadFile);
  const rawPayload = JSON.parse(await readFile(payloadFile, "utf8"));
  const parsedPayload = payloadSchema.parse(rawPayload);
  const payload: Payload = {
    ...parsedPayload,
    project: parsedPayload.project ? normalizeProject(parsedPayload.project) : undefined,
  };
  const translations = payload.translations as Translations | undefined;

  if (payload.project) {
    assertProjectCompleteness(payload.project, translations);
    if (!args.skipImages && translations) {
      await uploadProjectImages(payload.project, translations, payloadDir);
    }
    assertProjectCompleteness(payload.project, translations);
  }

  if (args.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const pool = createPool();

  try {
    await pool.query("BEGIN");
    const website = payload.website ? await upsertWebsite(pool, payload.website) : null;
    const project =
      payload.project && translations
        ? await upsertProject(pool, payload.project, translations)
        : null;
    await pool.query("COMMIT");

    if (!args.skipRevalidate) {
      await maybeRevalidate({
        slug: project?.slug,
        hasWebsite: Boolean(website),
        hasProject: Boolean(project),
      });
    }

    if (website) {
      console.log(`Website published: ${website.name}`);
    }
    if (project) {
      console.log(`Project published: ${project.slug}`);
      console.log(`CS: https://www.vvitovec.com/cs/projects/${project.slug}`);
      console.log(`EN: https://www.vvitovec.com/en/projects/${project.slug}`);
    }
  } catch (error) {
    await pool.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    await pool.end();
  }
};

main().catch((error) => {
  if (error instanceof z.ZodError) {
    console.error(error.flatten());
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
