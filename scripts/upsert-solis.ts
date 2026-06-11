import 'dotenv/config';

import { Pool } from 'pg';

import { solisProject, solisWebsite } from '../prisma/solis-data';

const databaseUrl = process.env.DATABASE_URL;
const acceptSelfSigned =
  process.env.PRISMA_PG_ACCEPT_SELF_SIGNED === 'true' ||
  process.env.PG_SSL_REJECT_UNAUTHORIZED === 'false';

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set.');
}

const connectionString = (() => {
  if (!acceptSelfSigned) {
    return databaseUrl;
  }

  try {
    const parsed = new URL(databaseUrl);
    parsed.searchParams.delete('sslmode');
    return parsed.toString();
  } catch {
    return databaseUrl.replace(/([?&])sslmode=[^&]+&?/, '$1').replace(/[?&]$/, '');
  }
})();

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10_000,
  ...(acceptSelfSigned ? { ssl: { rejectUnauthorized: false } } : {}),
});

async function upsertSolisWebsite() {
  const updated = await pool.query<{ id: string; name: string }>(
    `
      UPDATE "Website"
      SET
        "name" = $1,
        "category" = $3,
        "description" = $4,
        "sortOrder" = $5,
        "status" = $6::"WebsiteStatus",
        "publishedAt" = COALESCE("publishedAt", $7),
        "updatedAt" = NOW()
      WHERE "url" = $2
      RETURNING "id", "name"
    `,
    [
      solisWebsite.name,
      solisWebsite.url,
      solisWebsite.category,
      solisWebsite.description,
      solisWebsite.sortOrder,
      solisWebsite.status,
      solisWebsite.publishedAt,
    ],
  );

  if (updated.rows[0]) {
    return updated.rows[0];
  }

  const created = await pool.query<{ id: string; name: string }>(
    `
      INSERT INTO "Website" (
        "id",
        "name",
        "url",
        "category",
        "description",
        "sortOrder",
        "status",
        "createdAt",
        "updatedAt",
        "publishedAt"
      )
      VALUES (
        'solis-website',
        $1,
        $2,
        $3,
        $4,
        $5,
        $6::"WebsiteStatus",
        NOW(),
        NOW(),
        $7
      )
      RETURNING "id", "name"
    `,
    [
      solisWebsite.name,
      solisWebsite.url,
      solisWebsite.category,
      solisWebsite.description,
      solisWebsite.sortOrder,
      solisWebsite.status,
      solisWebsite.publishedAt,
    ],
  );

  const website = created.rows[0];
  if (!website) {
    throw new Error('Website upsert returned no row.');
  }

  return website;
}

async function upsertSolisProject() {
  const projectResult = await pool.query<{ id: string; slug: string }>(
    `
      INSERT INTO "Project" (
        "id",
        "slug",
        "featured",
        "status",
        "year",
        "coverImageUrl",
        "galleryImageUrls",
        "liveUrl",
        "repoUrl",
        "techStack",
        "publishedAt",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        'solis-project',
        $1,
        $2,
        $3::"ProjectStatus",
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        NOW(),
        NOW()
      )
      ON CONFLICT ("slug") DO UPDATE
      SET
        "featured" = EXCLUDED."featured",
        "status" = EXCLUDED."status",
        "year" = EXCLUDED."year",
        "coverImageUrl" = EXCLUDED."coverImageUrl",
        "galleryImageUrls" = EXCLUDED."galleryImageUrls",
        "liveUrl" = EXCLUDED."liveUrl",
        "repoUrl" = EXCLUDED."repoUrl",
        "techStack" = EXCLUDED."techStack",
        "publishedAt" = EXCLUDED."publishedAt",
        "updatedAt" = NOW()
      RETURNING "id", "slug"
    `,
    [
      solisProject.slug,
      solisProject.featured,
      solisProject.status,
      solisProject.year,
      solisProject.coverImageUrl,
      solisProject.galleryImageUrls,
      solisProject.liveUrl,
      solisProject.repoUrl,
      solisProject.techStack,
      solisProject.publishedAt,
    ],
  );

  const project = projectResult.rows[0];
  if (!project) {
    throw new Error('Project upsert returned no row.');
  }

  for (const translation of solisProject.translations.create) {
    await pool.query(
      `
        INSERT INTO "ProjectTranslation" (
          "id",
          "projectId",
          "locale",
          "title",
          "tagline",
          "descriptionShort",
          "descriptionLong",
          "role",
          "highlights",
          "caseStudyBlocks",
          "createdAt",
          "updatedAt"
        )
        VALUES (
          $1,
          $2,
          $3::"Locale",
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10::jsonb,
          NOW(),
          NOW()
        )
        ON CONFLICT ("projectId", "locale") DO UPDATE
        SET
          "title" = EXCLUDED."title",
          "tagline" = EXCLUDED."tagline",
          "descriptionShort" = EXCLUDED."descriptionShort",
          "descriptionLong" = EXCLUDED."descriptionLong",
          "role" = EXCLUDED."role",
          "highlights" = EXCLUDED."highlights",
          "caseStudyBlocks" = EXCLUDED."caseStudyBlocks",
          "updatedAt" = NOW()
      `,
      [
        `solis-project-${translation.locale}`,
        project.id,
        translation.locale,
        translation.title,
        translation.tagline,
        translation.descriptionShort,
        translation.descriptionLong,
        translation.role,
        translation.highlights,
        JSON.stringify(translation.caseStudyBlocks),
      ],
    );
  }

  const locales = solisProject.translations.create
    .map((translation) => translation.locale)
    .sort()
    .join(', ');

  return { ...project, locales };
}

async function main() {
  const [website, project] = await Promise.all([upsertSolisWebsite(), upsertSolisProject()]);

  console.log(`Upserted ${website.name} website and ${project.slug} project (${project.locales}).`);
}

main()
  .catch((error) => {
    console.error('Solis upsert failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
