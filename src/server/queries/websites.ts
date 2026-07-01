import 'server-only';

import { unstable_cache, unstable_noStore } from 'next/cache';

import { type Locale, WebsiteStatus } from '@/generated/prisma';
import { normalizeHttpUrl } from '@/lib/url-safety';
import { db } from '@/server/db';
import {
  isDatabaseUnavailableError,
  logPublicQueryFallback,
} from '@/server/queries/public-query-error';

export type WebsiteView = {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string | null;
  previewImageUrl: string | null;
};

const REVALIDATE_SECONDS = 300;

const WEBSITE_PREVIEW_IMAGES: Record<string, string> = {
  'https://mostky-web.vercel.app/cs#plots': '/images/websites/mostky-u-kaplice/homepage.webp',
  'https://www.solis.cz/': '/images/projects/solis/homepage.webp',
};

const getWebsitePreviewImageUrl = (url: string) => WEBSITE_PREVIEW_IMAGES[url] ?? null;

const getPublishedWebsitesFetcher = async (): Promise<WebsiteView[]> => {
  try {
    const websites = await db.website.findMany({
      where: { status: WebsiteStatus.PUBLISHED },
      orderBy: [{ sortOrder: 'asc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        name: true,
        url: true,
        category: true,
        description: true,
      },
    });

    return websites.flatMap((website) => {
      const url = normalizeHttpUrl(website.url);

      if (!url) {
        return [];
      }

      return [
        {
          ...website,
          url,
          previewImageUrl: getWebsitePreviewImageUrl(url),
        },
      ];
    });
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    logPublicQueryFallback('Failed to load published websites', error);
    return [];
  }
};

const getPublishedWebsiteByIdFetcher = async (id: string): Promise<WebsiteView | null> => {
  try {
    const website = await db.website.findFirst({
      where: { id, status: WebsiteStatus.PUBLISHED },
      select: {
        id: true,
        name: true,
        url: true,
        category: true,
        description: true,
      },
    });

    if (!website) {
      return null;
    }

    const url = normalizeHttpUrl(website.url);
    if (!url) {
      return null;
    }

    return {
      ...website,
      url,
      previewImageUrl: getWebsitePreviewImageUrl(url),
    };
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    logPublicQueryFallback(`Failed to load published website "${id}"`, error);
    return null;
  }
};

export async function getPublishedWebsites(locale: Locale): Promise<WebsiteView[]> {
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore();
    return getPublishedWebsitesFetcher();
  }

  const cached = unstable_cache(getPublishedWebsitesFetcher, ['websites'], {
    revalidate: REVALIDATE_SECONDS,
    tags: ['websites', `websites:${locale}`],
  });

  return cached();
}

export async function getPublishedWebsiteById(id: string): Promise<WebsiteView | null> {
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore();
    return getPublishedWebsiteByIdFetcher(id);
  }

  const cached = unstable_cache(getPublishedWebsiteByIdFetcher, ['website', id], {
    revalidate: REVALIDATE_SECONDS,
    tags: ['websites', `website:${id}`],
  });

  return cached(id);
}
