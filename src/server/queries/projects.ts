import "server-only";

import { unstable_cache, unstable_noStore } from "next/cache";

import { type Locale, ProjectStatus } from "@/generated/prisma";
import { db } from "@/server/db";
import { CaseStudyBlocksSchema, type CaseStudyBlock } from "@/types/case-study";

export type ProjectView = {
  id: string;
  slug: string;
  featured: boolean;
  year: number;
  coverImageUrl: string | null;
  galleryImageUrls: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  techStack: string[];
  title: string;
  tagline: string | null;
  descriptionShort: string | null;
  descriptionLong: string | null;
  caseStudyBlocks: CaseStudyBlock[];
  role: string | null;
  highlights: string[];
};

type ProjectTranslationView = {
  locale: Locale;
  title: string;
  tagline: string | null;
  descriptionShort: string | null;
  descriptionLong: string | null;
  caseStudyBlocks: unknown;
  role: string | null;
  highlights: string[];
};

const fallbackOrder: Locale[] = ["cs", "en"];

const resolveProjectYear = (
  year: number | null,
  publishedAt: Date | null,
  createdAt: Date,
) => year ?? publishedAt?.getFullYear() ?? createdAt.getFullYear();

function getLocaleFallbacks(locale: Locale): Locale[] {
  return Array.from(new Set<Locale>([locale, ...fallbackOrder]));
}

function selectTranslation(
  translations: ProjectTranslationView[],
  locales: Locale[],
): ProjectTranslationView | null {
  for (const locale of locales) {
    const match = translations.find((translation) => translation.locale === locale);
    if (match) {
      return match;
    }
  }
  return null;
}

function normalizeProject(
  project: {
    id: string;
    slug: string;
    featured: boolean;
    year: number | null;
    coverImageUrl: string | null;
    galleryImageUrls: string[];
    liveUrl: string | null;
    repoUrl: string | null;
    techStack: string[];
    createdAt: Date;
    publishedAt: Date | null;
    translations: ProjectTranslationView[];
  },
  locales: Locale[],
): ProjectView {
  const translation = selectTranslation(project.translations, locales);
  const caseStudyBlocksResult = CaseStudyBlocksSchema.safeParse(
    translation?.caseStudyBlocks ?? [],
  );

  if (!caseStudyBlocksResult.success && translation) {
    console.warn("Invalid caseStudyBlocks for project translation", {
      projectId: project.id,
      slug: project.slug,
      locale: translation.locale,
    });
  }

  const caseStudyBlocks = caseStudyBlocksResult.success
    ? caseStudyBlocksResult.data
    : [];

  return {
    id: project.id,
    slug: project.slug,
    featured: project.featured,
    year: resolveProjectYear(project.year, project.publishedAt, project.createdAt),
    coverImageUrl: project.coverImageUrl,
    galleryImageUrls: project.galleryImageUrls ?? [],
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
    techStack: project.techStack,
    title: translation?.title ?? project.slug,
    tagline: translation?.tagline ?? null,
    descriptionShort: translation?.descriptionShort ?? null,
    descriptionLong: translation?.descriptionLong ?? null,
    caseStudyBlocks,
    role: translation?.role ?? null,
    highlights: translation?.highlights ?? [],
  };
}

const REVALIDATE_SECONDS = 300;

const getPublishedProjectsFetcher = async (
  locale: Locale,
): Promise<ProjectView[]> => {
  const locales = getLocaleFallbacks(locale);

  const projects = await db.project.findMany({
    where: { status: ProjectStatus.PUBLISHED },
    orderBy: [
      { featured: "desc" },
      { year: "desc" },
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      slug: true,
      featured: true,
      year: true,
      coverImageUrl: true,
      galleryImageUrls: true,
      liveUrl: true,
      repoUrl: true,
      techStack: true,
      createdAt: true,
      publishedAt: true,
      translations: {
        where: { locale: { in: locales } },
        select: {
          locale: true,
          title: true,
          tagline: true,
          descriptionShort: true,
          descriptionLong: true,
          caseStudyBlocks: true,
          role: true,
          highlights: true,
        },
      },
    },
  });

  return projects.map((project) => normalizeProject(project, locales));
};

const getPublishedProjectBySlugFetcher = async (
  slug: string,
  locale: Locale,
): Promise<ProjectView | null> => {
  const locales = getLocaleFallbacks(locale);

  const project = await db.project.findFirst({
    where: { slug, status: ProjectStatus.PUBLISHED },
    select: {
      id: true,
      slug: true,
      featured: true,
      year: true,
      coverImageUrl: true,
      galleryImageUrls: true,
      liveUrl: true,
      repoUrl: true,
      techStack: true,
      createdAt: true,
      publishedAt: true,
      translations: {
        where: { locale: { in: locales } },
        select: {
          locale: true,
          title: true,
          tagline: true,
          descriptionShort: true,
          descriptionLong: true,
          caseStudyBlocks: true,
          role: true,
          highlights: true,
        },
      },
    },
  });

  if (!project) {
    return null;
  }

  return normalizeProject(project, locales);
};

export async function getPublishedProjects(locale: Locale): Promise<ProjectView[]> {
  if (process.env.NODE_ENV === "development") {
    unstable_noStore();
    return getPublishedProjectsFetcher(locale);
  }

  const cached = unstable_cache(
    getPublishedProjectsFetcher,
    ["projects", locale],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: ["projects", `projects:${locale}`],
    },
  );

  return cached(locale);
}

export async function getPublishedProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<ProjectView | null> {
  if (process.env.NODE_ENV === "development") {
    unstable_noStore();
    return getPublishedProjectBySlugFetcher(slug, locale);
  }

  const cached = unstable_cache(
    getPublishedProjectBySlugFetcher,
    ["project", slug, locale],
    {
      revalidate: REVALIDATE_SECONDS,
      tags: ["projects", `project:${slug}`, `project:${slug}:${locale}`],
    },
  );

  return cached(slug, locale);
}
