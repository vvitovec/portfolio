import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

import { Locale, ProjectStatus } from "@/generated/prisma";
import { slugify } from "@/lib/slugify";
import { deleteManagedStorageUrls } from "@/server/blob/getBlobRwToken";
import { db } from "@/server/db";
import { adminProcedure, router } from "@/server/trpc/trpc";
import { revalidatePublicProjects } from "@/server/revalidate";
import {
  CaseStudyBlocksSchema,
  CaseStudyTranslationSchema,
  ProjectTranslationStructuredSchema,
  createDefaultCaseStudyBlocks,
  type CaseStudyBlock,
  type CaseStudyTranslationPayload,
  type ProjectTranslationStructuredPayload,
} from "@/types/case-study";
import { assertOpenAIKey, openai } from "@/server/openai/client";

const translationSchema = z.object({
  title: z.string().trim().min(1),
  tagline: z.string().trim().max(200).optional().nullable(),
  descriptionShort: z.string().trim().max(400).optional().nullable(),
  descriptionLong: z.string().trim().max(5000).optional().nullable(),
  caseStudyBlocks: CaseStudyBlocksSchema.optional(),
  role: z.string().trim().max(200).optional().nullable(),
  highlights: z.array(z.string().trim().min(1).max(200)).optional(),
});

const translationsSchema = z.object({
  cs: translationSchema,
  en: translationSchema,
});

const baseFieldsSchema = z.object({
  slug: z.string().trim().min(1).max(120).optional(),
  featured: z.boolean().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
  year: z.number().int().min(1900).max(2100).optional().nullable(),
  coverImageUrl: z.string().trim().max(500).optional().nullable(),
  galleryImageUrls: z.array(z.string().trim().max(500)).optional(),
  liveUrl: z.string().trim().max(500).optional().nullable(),
  repoUrl: z.string().trim().max(500).optional().nullable(),
  techStack: z.array(z.string().trim().min(1).max(100)).optional(),
});

const createSchema = baseFieldsSchema.extend({
  translations: translationsSchema,
});

const updateSchema = baseFieldsSchema.extend({
  id: z.string().min(1),
  translations: translationsSchema,
});

const idSchema = z.object({
  id: z.string().min(1),
});

const normalizeOptionalString = (value?: string | null) => {
  if (value === undefined) return null;
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const normalizeStringArray = (values?: string[]) => {
  if (!values) return [];
  return values
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
};

const normalizeOptionalStringArray = (values?: string[] | null) => {
  if (!values) return [];
  return values.map((value) => value.trim()).filter((value) => value.length > 0);
};

const AUTO_TRANSLATE_COOLDOWN_MS = 10_000;
const lastAutoTranslateAt = new Map<string, number>();

const normalizeTranslation = (input: z.infer<typeof translationSchema>) => ({
  title: input.title.trim(),
  tagline: normalizeOptionalString(input.tagline),
  descriptionShort: normalizeOptionalString(input.descriptionShort),
  descriptionLong: normalizeOptionalString(input.descriptionLong),
  ...(input.caseStudyBlocks !== undefined
    ? { caseStudyBlocks: input.caseStudyBlocks }
    : {}),
  role: normalizeOptionalString(input.role),
  highlights: input.highlights ?? [],
});

const parseCaseStudyBlocks = (value: unknown) => {
  const parsed = CaseStudyBlocksSchema.safeParse(value);
  if (!parsed.success) {
    return [];
  }
  return parsed.data;
};

const hasText = (value?: string | null) => Boolean(value?.trim());

const mergeText = (
  existing?: string | null,
  translated?: string | null,
): string | null => {
  if (hasText(existing)) {
    return existing ?? null;
  }
  if (hasText(translated)) {
    return translated ?? null;
  }
  return null;
};

const toOptionalText = (value?: string | null) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const mergeCaseStudyBlocksFill = (
  existingBlocks: CaseStudyBlock[],
  translatedBlocks: CaseStudyBlock[],
) => {
  const existingMap = new Map(existingBlocks.map((block) => [block.id, block]));
  const translatedMap = new Map(translatedBlocks.map((block) => [block.id, block]));

  const merged = translatedBlocks.map((translated) => {
    const existing = existingMap.get(translated.id);
    if (!existing || existing.type !== translated.type) {
      return translated;
    }

    if (existing.type === "image" && translated.type === "image") {
      return {
        ...existing,
        title: toOptionalText(mergeText(existing.title, translated.title)),
        body: toOptionalText(mergeText(existing.body, translated.body)),
        caption: toOptionalText(mergeText(existing.caption, translated.caption)),
        imageUrl: existing.imageUrl || translated.imageUrl,
        layout: existing.layout ?? translated.layout,
      };
    }

    if (existing.type === "outcome" && translated.type === "outcome") {
      const bullets =
        existing.bullets && existing.bullets.length > 0
          ? existing.bullets
          : translated.bullets;
      return {
        ...existing,
        title: toOptionalText(mergeText(existing.title, translated.title)),
        body: toOptionalText(mergeText(existing.body, translated.body)),
        bullets,
      };
    }

    if (existing.type === "problem" || existing.type === "solution") {
      const nextBody =
        hasText(existing.body) ? existing.body : translated.body ?? "";
      return {
        ...existing,
        title: toOptionalText(mergeText(existing.title, translated.title)),
        body: nextBody,
      };
    }

    return existing;
  });

  const extraExisting = existingBlocks.filter(
    (block) => !translatedMap.has(block.id),
  );

  return [...merged, ...extraExisting];
};

const normalizeStructuredText = (value?: string | null) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const normalizeStructuredBlocks = (
  blocks: ProjectTranslationStructuredPayload["caseStudyBlocks"],
): CaseStudyBlock[] =>
  blocks.map((block) => {
    if (block.type === "problem" || block.type === "solution") {
      const title = normalizeStructuredText(block.title ?? null);
      const body = normalizeStructuredText(block.body ?? null) ?? "";
      return {
        id: block.id,
        type: block.type,
        ...(title ? { title } : {}),
        body,
      };
    }

    if (block.type === "outcome") {
      const title = normalizeStructuredText(block.title ?? null);
      const body = normalizeStructuredText(block.body ?? null);
      const bullets = normalizeOptionalStringArray(block.bullets ?? null);
      return {
        id: block.id,
        type: "outcome",
        ...(title ? { title } : {}),
        ...(body ? { body } : {}),
        ...(bullets.length > 0 ? { bullets } : {}),
      };
    }

    const imageUrl = normalizeStructuredText(block.imageUrl ?? null);
    if (!imageUrl) {
      throw new Error("Image block missing imageUrl.");
    }
    const title = normalizeStructuredText(block.title ?? null);
    const body = normalizeStructuredText(block.body ?? null);
    const caption = normalizeStructuredText(block.caption ?? null);
    const layout = block.layout ?? undefined;

    return {
      id: block.id,
      type: "image",
      imageUrl,
      ...(title ? { title } : {}),
      ...(body ? { body } : {}),
      ...(caption ? { caption } : {}),
      ...(layout ? { layout } : {}),
    };
  });


async function slugExists(slug: string, excludeId?: string) {
  const existing = await db.project.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true },
  });

  return Boolean(existing);
}

async function getAvailableSlug(baseSlug: string) {
  const existing = await db.project.findMany({
    where: {
      slug: { startsWith: baseSlug },
    },
    select: { slug: true },
  });

  const taken = new Set(existing.map((item) => item.slug));

  if (!taken.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  while (taken.has(`${baseSlug}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseSlug}-${suffix}`;
}

export const adminProjectsRouter = router({
  list: adminProcedure.query(async () =>
    db.project.findMany({
      orderBy: [
        { featured: "desc" },
        { year: "desc" },
        { updatedAt: "desc" },
      ],
      include: { translations: true },
    }),
  ),
  getById: adminProcedure.input(idSchema).query(async ({ input }) => {
    const project = await db.project.findUnique({
      where: { id: input.id },
      include: { translations: true },
    });

    if (!project) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Project not found." });
    }

    return project;
  }),
  create: adminProcedure.input(createSchema).mutation(async ({ input }) => {
    const csTranslation = normalizeTranslation(input.translations.cs);
    const enTranslation = normalizeTranslation(input.translations.en);
    const csCaseStudyBlocks =
      input.translations.cs.caseStudyBlocks ?? createDefaultCaseStudyBlocks("cs");
    const enCaseStudyBlocks =
      input.translations.en.caseStudyBlocks ?? createDefaultCaseStudyBlocks("en");

    const rawSlug = input.slug ?? input.translations.cs.title;
    const baseSlug = slugify(rawSlug);

    if (!baseSlug) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Slug could not be generated.",
      });
    }

    let slug = baseSlug;
    if (input.slug) {
      if (await slugExists(slug)) {
        throw new TRPCError({ code: "CONFLICT", message: "Slug already exists." });
      }
    } else {
      slug = await getAvailableSlug(baseSlug);
    }

    const status = input.status ?? ProjectStatus.DRAFT;
    const publishedAt = status === ProjectStatus.PUBLISHED ? new Date() : null;

    const created = await db.project.create({
      data: {
        slug,
        featured: input.featured ?? false,
        status,
        publishedAt,
        year: input.year ?? null,
        coverImageUrl: normalizeOptionalString(input.coverImageUrl),
        galleryImageUrls: normalizeStringArray(input.galleryImageUrls),
        liveUrl: normalizeOptionalString(input.liveUrl),
        repoUrl: normalizeOptionalString(input.repoUrl),
        techStack: input.techStack ?? [],
        translations: {
          create: [
            { locale: Locale.cs, ...csTranslation, caseStudyBlocks: csCaseStudyBlocks },
            { locale: Locale.en, ...enTranslation, caseStudyBlocks: enCaseStudyBlocks },
          ],
        },
      },
      include: { translations: true },
    });

    revalidatePublicProjects({ slug: created.slug });
    return created;
  }),
  update: adminProcedure.input(updateSchema).mutation(async ({ input }) => {
    const csTranslation = normalizeTranslation(input.translations.cs);
    const enTranslation = normalizeTranslation(input.translations.en);

    const existing = await db.project.findUnique({
      where: { id: input.id },
      select: {
        slug: true,
        coverImageUrl: true,
        galleryImageUrls: true,
      },
    });

    if (!existing) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Project not found." });
    }

    let slugUpdate: string | undefined;
    if (input.slug) {
      const baseSlug = slugify(input.slug);
      if (!baseSlug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug could not be generated.",
        });
      }

      if (await slugExists(baseSlug, input.id)) {
        throw new TRPCError({ code: "CONFLICT", message: "Slug already exists." });
      }

      slugUpdate = baseSlug;
    }

    const nextCoverImageUrl =
      input.coverImageUrl !== undefined
        ? normalizeOptionalString(input.coverImageUrl)
        : existing.coverImageUrl;
    const nextGalleryImageUrls =
      input.galleryImageUrls !== undefined
        ? normalizeStringArray(input.galleryImageUrls)
        : existing.galleryImageUrls;

    const updateData = {
      ...(slugUpdate ? { slug: slugUpdate } : {}),
      ...(input.featured !== undefined ? { featured: input.featured } : {}),
      ...(input.status
        ? {
            status: input.status,
            publishedAt:
              input.status === ProjectStatus.PUBLISHED ? new Date() : null,
          }
        : {}),
      ...(input.year !== undefined ? { year: input.year } : {}),
      ...(input.coverImageUrl !== undefined
        ? { coverImageUrl: nextCoverImageUrl }
        : {}),
      ...(input.galleryImageUrls !== undefined
        ? { galleryImageUrls: nextGalleryImageUrls }
        : {}),
      ...(input.liveUrl !== undefined
        ? { liveUrl: normalizeOptionalString(input.liveUrl) }
        : {}),
      ...(input.repoUrl !== undefined
        ? { repoUrl: normalizeOptionalString(input.repoUrl) }
        : {}),
      ...(input.techStack !== undefined ? { techStack: input.techStack } : {}),
      translations: {
        upsert: [
          {
            where: {
              projectId_locale: { projectId: input.id, locale: Locale.cs },
            },
            update: csTranslation,
            create: { locale: Locale.cs, ...csTranslation },
          },
          {
            where: {
              projectId_locale: { projectId: input.id, locale: Locale.en },
            },
            update: enTranslation,
            create: { locale: Locale.en, ...enTranslation },
          },
        ],
      },
    };

    const updated = await db.project.update({
      where: { id: input.id },
      data: updateData,
      include: { translations: true },
    });

    const oldUrls = [
      existing.coverImageUrl,
      ...(existing.galleryImageUrls ?? []),
    ].filter(Boolean) as string[];
    const newUrls = [nextCoverImageUrl, ...nextGalleryImageUrls].filter(
      Boolean,
    ) as string[];
    const newUrlSet = new Set(newUrls);
    const toDelete = oldUrls.filter((url) => !newUrlSet.has(url));
    await deleteManagedStorageUrls(toDelete);

    if (existing.slug && existing.slug !== updated.slug) {
      revalidatePublicProjects({ slug: existing.slug });
    }
    revalidatePublicProjects({ slug: updated.slug });
    return updated;
  }),
  delete: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const project = await db.project.findUnique({
      where: { id: input.id },
      select: { slug: true, coverImageUrl: true, galleryImageUrls: true },
    });

    if (!project) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Project not found." });
    }

    const urls = [
      project.coverImageUrl,
      ...(project.galleryImageUrls ?? []),
    ].filter(Boolean) as string[];
    await deleteManagedStorageUrls(urls);
    await db.project.delete({ where: { id: input.id } });
    revalidatePublicProjects({ slug: project.slug });
    return { success: true };
  }),
  publish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const project = await db.project.update({
      where: { id: input.id },
      data: { status: ProjectStatus.PUBLISHED, publishedAt: new Date() },
      include: { translations: true },
    });
    revalidatePublicProjects({ slug: project.slug });
    return project;
  }),
  unpublish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const project = await db.project.update({
      where: { id: input.id },
      data: { status: ProjectStatus.DRAFT, publishedAt: null },
      include: { translations: true },
    });
    revalidatePublicProjects({ slug: project.slug });
    return project;
  }),
  autoTranslateToEn: adminProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
        mode: z.enum(["overwrite", "fill_missing"]),
      }),
    )
    .mutation(async ({ input }) => {
      const lastRun = lastAutoTranslateAt.get(input.projectId);
      const now = Date.now();
      if (lastRun && now - lastRun < AUTO_TRANSLATE_COOLDOWN_MS) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Please wait before running auto-translate again.",
        });
      }
      lastAutoTranslateAt.set(input.projectId, now);

      let project;
      try {
        project = await db.project.findUnique({
          where: { id: input.projectId },
          include: { translations: true },
        });
      } catch (error) {
        console.error("Failed to load project for auto-translate", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to load project.",
        });
      }

      if (!project) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Project not found." });
      }

      const csTranslation = project.translations.find(
        (translation) => translation.locale === Locale.cs,
      );
      if (!csTranslation) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing CS translation.",
        });
      }

      const enTranslation = project.translations.find(
        (translation) => translation.locale === Locale.en,
      );

      try {
        assertOpenAIKey();
      } catch (error) {
        console.error("OpenAI API key missing for auto-translate", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API key is missing.",
        });
      }

      const csBlocks = parseCaseStudyBlocks(csTranslation.caseStudyBlocks);
      let sourcePayload: CaseStudyTranslationPayload;
      try {
        sourcePayload = CaseStudyTranslationSchema.parse({
          title: csTranslation.title,
          tagline: csTranslation.tagline ?? null,
          descriptionShort: csTranslation.descriptionShort ?? null,
          role: csTranslation.role ?? null,
          highlights: csTranslation.highlights ?? [],
          caseStudyBlocks: csBlocks,
        });
      } catch (error) {
        console.error("Invalid CS translation payload for auto-translate", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "CS translation data is invalid. Please review the content.",
        });
      }

      const model = process.env.OPENAI_TRANSLATE_MODEL || "gpt-4o-mini";

      let structured: ProjectTranslationStructuredPayload;
      let translated: CaseStudyTranslationPayload;
      try {
        const response = await openai.responses.parse({
          model,
          input: [
            {
              role: "system",
              content:
                "You are a professional localization specialist. Translate Czech content into natural, precise English. Preserve tone and meaning. Do not add marketing hype. Keep product names, company names, and technology names unchanged. Keep all IDs, types, layouts, and image URLs exactly as provided. Return only valid JSON matching the schema.",
            },
            {
              role: "user",
              content: `Translate this project payload from CS to EN. Preserve structure and keep id/type/layout/imageUrl unchanged.\n\n${JSON.stringify(
                sourcePayload,
              )}`,
            },
          ],
          text: {
            format: zodTextFormat(
              ProjectTranslationStructuredSchema,
              "project_translation",
            ),
          },
          temperature: 0.2,
        });

        if (!response.output_parsed) {
          throw new Error("No structured output returned from OpenAI.");
        }

        structured = ProjectTranslationStructuredSchema.parse(
          response.output_parsed,
        );

        const normalizedBlocks = normalizeStructuredBlocks(
          structured.caseStudyBlocks,
        );
        const strictBlocks = CaseStudyBlocksSchema.parse(normalizedBlocks);

        translated = CaseStudyTranslationSchema.parse({
          title: structured.title,
          tagline: normalizeOptionalString(structured.tagline ?? null),
          descriptionShort: normalizeOptionalString(
            structured.descriptionShort ?? null,
          ),
          role: normalizeOptionalString(structured.role ?? null),
          highlights: normalizeOptionalStringArray(structured.highlights ?? []),
          caseStudyBlocks: strictBlocks,
        });
      } catch (error) {
        console.error("OpenAI auto-translate failed", error);
        const message =
          error instanceof Error
            ? error.message
            : "Auto-translation failed.";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message,
        });
      }

      const normalizedTranslated = {
        title: translated.title.trim(),
        tagline: normalizeOptionalString(translated.tagline ?? null),
        descriptionShort: normalizeOptionalString(translated.descriptionShort ?? null),
        role: normalizeOptionalString(translated.role ?? null),
        highlights: translated.highlights ?? [],
        caseStudyBlocks: translated.caseStudyBlocks,
      };

      let dataToSave = normalizedTranslated;

      if (input.mode === "fill_missing" && enTranslation) {
        const enBlocks = parseCaseStudyBlocks(enTranslation.caseStudyBlocks);
        dataToSave = {
          title: mergeText(enTranslation.title, normalizedTranslated.title) ?? "",
          tagline: mergeText(enTranslation.tagline, normalizedTranslated.tagline),
          descriptionShort: mergeText(
            enTranslation.descriptionShort,
            normalizedTranslated.descriptionShort,
          ),
          role: mergeText(enTranslation.role, normalizedTranslated.role),
          highlights:
            enTranslation.highlights && enTranslation.highlights.length > 0
              ? enTranslation.highlights
              : normalizedTranslated.highlights,
          caseStudyBlocks: mergeCaseStudyBlocksFill(
            enBlocks,
            normalizedTranslated.caseStudyBlocks,
          ),
        };
      }

      let updatedTranslation;
      try {
        updatedTranslation = await db.projectTranslation.upsert({
          where: {
            projectId_locale: { projectId: input.projectId, locale: Locale.en },
          },
          update: dataToSave,
          create: {
            projectId: input.projectId,
            locale: Locale.en,
            ...dataToSave,
          },
        });
      } catch (error) {
        console.error("Failed to save EN translation", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to save translation.",
        });
      }

      revalidatePublicProjects({ slug: project.slug });
      return updatedTranslation;
    }),
});
