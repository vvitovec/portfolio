import "server-only";

import { unstable_cache } from "next/cache";

import { type Locale, ProjectStatus } from "@/generated/prisma";
import { db } from "@/server/db";

export type ProjectView = {
  id: string;
  slug: string;
  featured: boolean;
  coverImageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  techStack: string[];
  title: string;
  tagline: string | null;
  descriptionShort: string | null;
  highlights: string[];
};

type ProjectTranslationView = {
  locale: Locale;
  title: string;
  tagline: string | null;
  descriptionShort: string | null;
  highlights: string[];
};

const fallbackOrder: Locale[] = ["cs", "en"];

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
    coverImageUrl: string | null;
    liveUrl: string | null;
    repoUrl: string | null;
    techStack: string[];
    translations: ProjectTranslationView[];
  },
  locales: Locale[],
): ProjectView {
  const translation = selectTranslation(project.translations, locales);

  return {
    id: project.id,
    slug: project.slug,
    featured: project.featured,
    coverImageUrl: project.coverImageUrl,
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
    techStack: project.techStack,
    title: translation?.title ?? project.slug,
    tagline: translation?.tagline ?? null,
    descriptionShort: translation?.descriptionShort ?? null,
    highlights: translation?.highlights ?? [],
  };
}

const REVALIDATE_SECONDS = 300;

const getPublishedProjectsCached = unstable_cache(
  async (locale: Locale): Promise<ProjectView[]> => {
    const locales = getLocaleFallbacks(locale);

    const projects = await db.project.findMany({
      where: { status: ProjectStatus.PUBLISHED },
      orderBy: [
        { featured: "desc" },
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        slug: true,
        featured: true,
        coverImageUrl: true,
        liveUrl: true,
        repoUrl: true,
        techStack: true,
        translations: {
          where: { locale: { in: locales } },
          select: {
            locale: true,
            title: true,
            tagline: true,
            descriptionShort: true,
            highlights: true,
          },
        },
      },
    });

    return projects.map((project) => normalizeProject(project, locales));
  },
  ["public-projects"],
  { revalidate: REVALIDATE_SECONDS },
);

const getPublishedProjectBySlugCached = unstable_cache(
  async (slug: string, locale: Locale): Promise<ProjectView | null> => {
    const locales = getLocaleFallbacks(locale);

    const project = await db.project.findFirst({
      where: { slug, status: ProjectStatus.PUBLISHED },
      select: {
        id: true,
        slug: true,
        featured: true,
        coverImageUrl: true,
        liveUrl: true,
        repoUrl: true,
        techStack: true,
        translations: {
          where: { locale: { in: locales } },
          select: {
            locale: true,
            title: true,
            tagline: true,
            descriptionShort: true,
            highlights: true,
          },
        },
      },
    });

    if (!project) {
      return null;
    }

    return normalizeProject(project, locales);
  },
  ["public-project"],
  { revalidate: REVALIDATE_SECONDS },
);

export async function getPublishedProjects(locale: Locale): Promise<ProjectView[]> {
  return getPublishedProjectsCached(locale);
}

export async function getPublishedProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<ProjectView | null> {
  return getPublishedProjectBySlugCached(slug, locale);
}
