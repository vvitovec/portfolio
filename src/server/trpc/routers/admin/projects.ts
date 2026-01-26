import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";

import { Locale, ProjectStatus } from "@/generated/prisma";
import { slugify } from "@/lib/slugify";
import { db } from "@/server/db";
import { adminProcedure, router } from "@/server/trpc/trpc";
import { routing } from "@/i18n/routing";

const translationSchema = z.object({
  title: z.string().trim().min(1),
  tagline: z.string().trim().max(200).optional().nullable(),
  descriptionShort: z.string().trim().max(400).optional().nullable(),
  descriptionLong: z.string().trim().max(5000).optional().nullable(),
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

const isBlobUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.hostname.endsWith("public.blob.vercel-storage.com");
  } catch {
    return false;
  }
};

const deleteBlobUrls = async (urls: string[]) => {
  const uniqueUrls = Array.from(new Set(urls)).filter(isBlobUrl);
  if (uniqueUrls.length === 0) {
    return;
  }
  try {
    await del(uniqueUrls);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to delete blob files", error);
    }
  }
};

const normalizeTranslation = (input: z.infer<typeof translationSchema>) => ({
  title: input.title.trim(),
  tagline: normalizeOptionalString(input.tagline),
  descriptionShort: normalizeOptionalString(input.descriptionShort),
  descriptionLong: normalizeOptionalString(input.descriptionLong),
  role: normalizeOptionalString(input.role),
  highlights: input.highlights ?? [],
});

const revalidatePublicPaths = (slug?: string) => {
  routing.locales.forEach((locale) => {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/projects`);
    if (slug) {
      revalidatePath(`/${locale}/projects/${slug}`);
    }
  });
};

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
      orderBy: { updatedAt: "desc" },
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

    return db.project.create({
      data: {
        slug,
        featured: input.featured ?? false,
        status,
        publishedAt,
        coverImageUrl: normalizeOptionalString(input.coverImageUrl),
        galleryImageUrls: normalizeStringArray(input.galleryImageUrls),
        liveUrl: normalizeOptionalString(input.liveUrl),
        repoUrl: normalizeOptionalString(input.repoUrl),
        techStack: input.techStack ?? [],
        translations: {
          create: [
            { locale: Locale.cs, ...csTranslation },
            { locale: Locale.en, ...enTranslation },
          ],
        },
      },
      include: { translations: true },
    });
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
    await deleteBlobUrls(toDelete);

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
    await deleteBlobUrls(urls);
    await db.project.delete({ where: { id: input.id } });
    revalidatePublicPaths(project.slug);
    return { success: true };
  }),
  publish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const project = await db.project.update({
      where: { id: input.id },
      data: { status: ProjectStatus.PUBLISHED, publishedAt: new Date() },
      include: { translations: true },
    });
    revalidatePublicPaths(project.slug);
    return project;
  }),
  unpublish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const project = await db.project.update({
      where: { id: input.id },
      data: { status: ProjectStatus.DRAFT, publishedAt: null },
      include: { translations: true },
    });
    revalidatePublicPaths(project.slug);
    return project;
  }),
});
