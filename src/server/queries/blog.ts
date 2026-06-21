import "server-only";

import { unstable_cache, unstable_noStore } from "next/cache";

import { BlogPostStatus, type Locale } from "@/generated/prisma";
import { db } from "@/server/db";
import {
  isDatabaseUnavailableError,
  logPublicQueryFallback,
} from "@/server/queries/public-query-error";

export type BlogPostView = {
  id: string;
  slug: string;
  featured: boolean;
  tags: string[];
  coverImageUrl: string | null;
  coverImageCredit: string | null;
  coverImageCreditUrl: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  publishedAt: Date | string | null;
  title: string;
  excerpt: string | null;
  contentMarkdown: string;
  seoTitle: string | null;
  seoDescription: string | null;
  coverImageAlt: string | null;
  coverImageCaption: string | null;
};

type BlogPostTranslationView = {
  locale: Locale;
  title: string;
  excerpt: string | null;
  contentMarkdown: string;
  seoTitle: string | null;
  seoDescription: string | null;
  coverImageAlt: string | null;
  coverImageCaption: string | null;
};

const fallbackOrder: Locale[] = ["cs", "en"];
const REVALIDATE_SECONDS = 300;

function coerceDate(value: Date | string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getLocaleFallbacks(locale: Locale): Locale[] {
  return Array.from(new Set<Locale>([locale, ...fallbackOrder]));
}

function selectTranslation(
  translations: BlogPostTranslationView[],
  locales: Locale[],
): BlogPostTranslationView | null {
  for (const locale of locales) {
    const match = translations.find((translation) => translation.locale === locale);
    if (match) {
      return match;
    }
  }

  return null;
}

function normalizeBlogPost(
  post: {
    id: string;
    slug: string;
    featured: boolean;
    tags: string[];
    coverImageUrl: string | null;
    coverImageCredit: string | null;
    coverImageCreditUrl: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    publishedAt: Date | string | null;
    translations: BlogPostTranslationView[];
  },
  locales: Locale[],
): BlogPostView {
  const translation = selectTranslation(post.translations, locales);
  const createdAt = coerceDate(post.createdAt) ?? new Date();
  const updatedAt = coerceDate(post.updatedAt) ?? createdAt;

  return {
    id: post.id,
    slug: post.slug,
    featured: post.featured,
    tags: post.tags,
    coverImageUrl: post.coverImageUrl,
    coverImageCredit: post.coverImageCredit,
    coverImageCreditUrl: post.coverImageCreditUrl,
    createdAt,
    updatedAt,
    publishedAt: coerceDate(post.publishedAt),
    title: translation?.title ?? post.slug,
    excerpt: translation?.excerpt ?? null,
    contentMarkdown: translation?.contentMarkdown ?? "",
    seoTitle: translation?.seoTitle ?? null,
    seoDescription: translation?.seoDescription ?? null,
    coverImageAlt: translation?.coverImageAlt ?? null,
    coverImageCaption: translation?.coverImageCaption ?? null,
  };
}

const getPublishedBlogPostsFetcher = async (
  locale: Locale,
): Promise<BlogPostView[]> => {
  const locales = getLocaleFallbacks(locale);

  try {
    const posts = await db.blogPost.findMany({
      where: { status: BlogPostStatus.PUBLISHED },
      orderBy: [
        { featured: "desc" },
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        slug: true,
        featured: true,
        tags: true,
        coverImageUrl: true,
        coverImageCredit: true,
        coverImageCreditUrl: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        translations: {
          where: { locale: { in: locales } },
          select: {
            locale: true,
            title: true,
            excerpt: true,
            contentMarkdown: true,
            seoTitle: true,
            seoDescription: true,
            coverImageAlt: true,
            coverImageCaption: true,
          },
        },
      },
    });

    return posts.map((post) => normalizeBlogPost(post, locales));
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    logPublicQueryFallback("Failed to load published blog posts", error);
    return [];
  }
};

const getPublishedBlogPostBySlugFetcher = async (
  slug: string,
  locale: Locale,
): Promise<BlogPostView | null> => {
  const locales = getLocaleFallbacks(locale);

  try {
    const post = await db.blogPost.findFirst({
      where: { slug, status: BlogPostStatus.PUBLISHED },
      select: {
        id: true,
        slug: true,
        featured: true,
        tags: true,
        coverImageUrl: true,
        coverImageCredit: true,
        coverImageCreditUrl: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        translations: {
          where: { locale: { in: locales } },
          select: {
            locale: true,
            title: true,
            excerpt: true,
            contentMarkdown: true,
            seoTitle: true,
            seoDescription: true,
            coverImageAlt: true,
            coverImageCaption: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    return normalizeBlogPost(post, locales);
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    logPublicQueryFallback(`Failed to load published blog post "${slug}"`, error);
    return null;
  }
};

const getPublishedBlogPostNeighborsFetcher = async (
  slug: string,
  locale: Locale,
): Promise<{ previous: BlogPostView | null; next: BlogPostView | null }> => {
  const locales = getLocaleFallbacks(locale);

  try {
    const posts = await db.blogPost.findMany({
      where: { status: BlogPostStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        featured: true,
        tags: true,
        coverImageUrl: true,
        coverImageCredit: true,
        coverImageCreditUrl: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        translations: {
          where: { locale: { in: locales } },
          select: {
            locale: true,
            title: true,
            excerpt: true,
            contentMarkdown: true,
            seoTitle: true,
            seoDescription: true,
            coverImageAlt: true,
            coverImageCaption: true,
          },
        },
      },
    });

    const normalizedPosts = posts.map((post) => normalizeBlogPost(post, locales));
    const index = normalizedPosts.findIndex((post) => post.slug === slug);

    if (index === -1) {
      return { previous: null, next: null };
    }

    return {
      previous: normalizedPosts[index + 1] ?? null,
      next: normalizedPosts[index - 1] ?? null,
    };
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    logPublicQueryFallback(
      `Failed to load published blog post neighbors for "${slug}"`,
      error,
    );
    return { previous: null, next: null };
  }
};

export async function getPublishedBlogPosts(
  locale: Locale,
): Promise<BlogPostView[]> {
  if (process.env.NODE_ENV === "development") {
    unstable_noStore();
    return getPublishedBlogPostsFetcher(locale);
  }

  const cached = unstable_cache(
    getPublishedBlogPostsFetcher,
    ["blog-posts", locale],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: ["blog-posts", `blog-posts:${locale}`],
    },
  );

  return cached(locale);
}

export async function getPublishedBlogPostBySlug(
  slug: string,
  locale: Locale,
): Promise<BlogPostView | null> {
  if (process.env.NODE_ENV === "development") {
    unstable_noStore();
    return getPublishedBlogPostBySlugFetcher(slug, locale);
  }

  const cached = unstable_cache(
    getPublishedBlogPostBySlugFetcher,
    ["blog-post", slug, locale],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: ["blog-posts", `blog-post:${slug}`, `blog-post:${slug}:${locale}`],
    },
  );

  return cached(slug, locale);
}

export async function getPublishedBlogPostNeighbors(
  slug: string,
  locale: Locale,
): Promise<{ previous: BlogPostView | null; next: BlogPostView | null }> {
  if (process.env.NODE_ENV === "development") {
    unstable_noStore();
    return getPublishedBlogPostNeighborsFetcher(slug, locale);
  }

  const cached = unstable_cache(
    getPublishedBlogPostNeighborsFetcher,
    ["blog-post-neighbors", slug, locale],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: ["blog-posts", `blog-post:${slug}`, `blog-post:${slug}:${locale}`],
    },
  );

  return cached(slug, locale);
}
