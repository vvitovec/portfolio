import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { BlogPostStatus, Locale } from "@/generated/prisma";
import { slugify } from "@/lib/slugify";
import {
  isHttpUrl,
  isSafePublicImageUrl,
  normalizeHttpUrl,
  normalizeSafePublicImageUrl,
} from "@/lib/url-safety";
import { deleteManagedStorageUrls } from "@/server/blob/getBlobRwToken";
import { db } from "@/server/db";
import { revalidatePublicBlog } from "@/server/revalidate";
import { adminProcedure, router } from "@/server/trpc/trpc";

const translationSchema = z.object({
  title: z.string().trim().min(1).max(180),
  excerpt: z.string().trim().max(500).optional().nullable(),
  contentMarkdown: z.string().trim().min(1).max(30000),
  seoTitle: z.string().trim().max(180).optional().nullable(),
  seoDescription: z.string().trim().max(300).optional().nullable(),
  coverImageAlt: z.string().trim().max(240).optional().nullable(),
  coverImageCaption: z.string().trim().max(500).optional().nullable(),
});

const translationsSchema = z.object({
  cs: translationSchema,
  en: translationSchema,
});

const baseFieldsSchema = z.object({
  slug: z.string().trim().min(1).max(120).optional(),
  featured: z.boolean().optional(),
  status: z.nativeEnum(BlogPostStatus).optional(),
  tags: z.array(z.string().trim().min(1).max(80)).max(12).optional(),
  coverImageUrl: z
    .string()
    .trim()
    .max(500)
    .refine((value) => value === "" || isSafePublicImageUrl(value))
    .optional()
    .nullable(),
  coverImageCredit: z.string().trim().max(200).optional().nullable(),
  coverImageCreditUrl: z
    .string()
    .trim()
    .max(500)
    .refine((value) => value === "" || isHttpUrl(value))
    .optional()
    .nullable(),
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

const normalizeStringArray = (values?: string[] | null) => {
  if (!values) return [];
  return Array.from(
    new Set(values.map((value) => value.trim()).filter((value) => value.length > 0)),
  );
};

const normalizeTranslation = (input: z.infer<typeof translationSchema>) => ({
  title: input.title.trim(),
  excerpt: normalizeOptionalString(input.excerpt),
  contentMarkdown: input.contentMarkdown.trim(),
  seoTitle: normalizeOptionalString(input.seoTitle),
  seoDescription: normalizeOptionalString(input.seoDescription),
  coverImageAlt: normalizeOptionalString(input.coverImageAlt),
  coverImageCaption: normalizeOptionalString(input.coverImageCaption),
});

async function slugExists(slug: string, excludeId?: string) {
  const existing = await db.blogPost.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true },
  });

  return Boolean(existing);
}

async function getAvailableSlug(baseSlug: string) {
  const existing = await db.blogPost.findMany({
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

const getPublishedAt = (
  status: BlogPostStatus,
  previousPublishedAt?: Date | null,
) => {
  if (status === BlogPostStatus.PUBLISHED) {
    return previousPublishedAt ?? new Date();
  }

  return null;
};

export const adminBlogRouter = router({
  list: adminProcedure.query(async () =>
    db.blogPost.findMany({
      orderBy: [
        { featured: "desc" },
        { publishedAt: "desc" },
        { updatedAt: "desc" },
      ],
      include: {
        translations: true,
        newsletterSends: {
          where: { status: "COMPLETED" },
          select: { id: true, createdAt: true },
          take: 1,
        },
      },
    }),
  ),
  getById: adminProcedure.input(idSchema).query(async ({ input }) => {
    const post = await db.blogPost.findUnique({
      where: { id: input.id },
      include: { translations: true },
    });

    if (!post) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Blog post not found." });
    }

    return post;
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

    const status = input.status ?? BlogPostStatus.DRAFT;
    const created = await db.blogPost.create({
      data: {
        slug,
        featured: input.featured ?? false,
        status,
        tags: normalizeStringArray(input.tags),
        coverImageUrl: normalizeSafePublicImageUrl(input.coverImageUrl),
        coverImageCredit: normalizeOptionalString(input.coverImageCredit),
        coverImageCreditUrl: normalizeHttpUrl(input.coverImageCreditUrl),
        publishedAt: getPublishedAt(status),
        translations: {
          create: [
            { locale: Locale.cs, ...csTranslation },
            { locale: Locale.en, ...enTranslation },
          ],
        },
      },
      include: { translations: true },
    });

    revalidatePublicBlog({ slug: created.slug });
    return created;
  }),
  update: adminProcedure.input(updateSchema).mutation(async ({ input }) => {
    const existing = await db.blogPost.findUnique({
      where: { id: input.id },
      select: {
        slug: true,
        coverImageUrl: true,
        publishedAt: true,
      },
    });

    if (!existing) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Blog post not found." });
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

    const status = input.status ?? undefined;
    const nextCoverImageUrl =
      input.coverImageUrl !== undefined
        ? normalizeSafePublicImageUrl(input.coverImageUrl)
        : existing.coverImageUrl;
    const csTranslation = normalizeTranslation(input.translations.cs);
    const enTranslation = normalizeTranslation(input.translations.en);

    const updated = await db.blogPost.update({
      where: { id: input.id },
      data: {
        ...(slugUpdate ? { slug: slugUpdate } : {}),
        ...(input.featured !== undefined ? { featured: input.featured } : {}),
        ...(status
          ? {
              status,
              publishedAt: getPublishedAt(status, existing.publishedAt),
            }
          : {}),
        ...(input.tags !== undefined
          ? { tags: normalizeStringArray(input.tags) }
          : {}),
        ...(input.coverImageUrl !== undefined
          ? { coverImageUrl: nextCoverImageUrl }
          : {}),
        ...(input.coverImageCredit !== undefined
          ? { coverImageCredit: normalizeOptionalString(input.coverImageCredit) }
          : {}),
        ...(input.coverImageCreditUrl !== undefined
          ? {
              coverImageCreditUrl: normalizeHttpUrl(input.coverImageCreditUrl),
            }
          : {}),
        translations: {
          upsert: [
            {
              where: {
                postId_locale: { postId: input.id, locale: Locale.cs },
              },
              update: csTranslation,
              create: { locale: Locale.cs, ...csTranslation },
            },
            {
              where: {
                postId_locale: { postId: input.id, locale: Locale.en },
              },
              update: enTranslation,
              create: { locale: Locale.en, ...enTranslation },
            },
          ],
        },
      },
      include: { translations: true },
    });

    if (existing.coverImageUrl && existing.coverImageUrl !== nextCoverImageUrl) {
      await deleteManagedStorageUrls([existing.coverImageUrl]);
    }

    if (existing.slug !== updated.slug) {
      revalidatePublicBlog({ slug: existing.slug });
    }
    revalidatePublicBlog({ slug: updated.slug });
    return updated;
  }),
  delete: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const post = await db.blogPost.findUnique({
      where: { id: input.id },
      select: { slug: true, coverImageUrl: true },
    });

    if (!post) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Blog post not found." });
    }

    if (post.coverImageUrl) {
      await deleteManagedStorageUrls([post.coverImageUrl]);
    }

    await db.blogPost.delete({ where: { id: input.id } });
    revalidatePublicBlog({ slug: post.slug });
    return { success: true };
  }),
  publish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const post = await db.blogPost.update({
      where: { id: input.id },
      data: { status: BlogPostStatus.PUBLISHED, publishedAt: new Date() },
      include: { translations: true },
    });
    revalidatePublicBlog({ slug: post.slug });
    return post;
  }),
  unpublish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const post = await db.blogPost.update({
      where: { id: input.id },
      data: { status: BlogPostStatus.DRAFT, publishedAt: null },
      include: { translations: true },
    });
    revalidatePublicBlog({ slug: post.slug });
    return post;
  }),
});
