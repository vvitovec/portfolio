import type { MetadataRoute } from "next";

import { ProjectStatus } from "@/generated/prisma";
import { routing } from "@/i18n/routing";
import { buildLocalePath, toAbsoluteUrl } from "@/lib/seo";
import { db } from "@/server/db";

const STATIC_PATHS = ["/", "/projects", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: toAbsoluteUrl(buildLocalePath(locale, path)),
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.8,
    })),
  );

  try {
    const projects = await db.project.findMany({
      where: { status: ProjectStatus.PUBLISHED },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
      routing.locales.map((locale) => ({
        url: toAbsoluteUrl(buildLocalePath(locale, `/projects/${project.slug}`)),
        lastModified: project.updatedAt ?? project.publishedAt ?? now,
        changeFrequency: "weekly",
        priority: 0.7,
      })),
    );

    return [...staticEntries, ...projectEntries];
  } catch (error) {
    console.error("Failed to include dynamic project URLs in sitemap", error);
    return staticEntries;
  }
}
