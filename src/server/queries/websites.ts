import "server-only";

import { unstable_cache, unstable_noStore } from "next/cache";

import { type Locale, WebsiteStatus } from "@/generated/prisma";
import { db } from "@/server/db";

export type WebsiteView = {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string | null;
};

const REVALIDATE_SECONDS = 300;

const getPublishedWebsitesFetcher = async (): Promise<WebsiteView[]> =>
  db.website.findMany({
    where: { status: WebsiteStatus.PUBLISHED },
    orderBy: [
      { sortOrder: "asc" },
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      name: true,
      url: true,
      category: true,
      description: true,
    },
  });

export async function getPublishedWebsites(
  locale: Locale,
): Promise<WebsiteView[]> {
  if (process.env.NODE_ENV === "development") {
    unstable_noStore();
    return getPublishedWebsitesFetcher();
  }

  const cached = unstable_cache(getPublishedWebsitesFetcher, ["websites"], {
    revalidate: REVALIDATE_SECONDS,
    tags: ["websites", `websites:${locale}`],
  });

  return cached();
}
