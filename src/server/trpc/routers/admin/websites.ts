import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { WebsiteStatus } from "@/generated/prisma";
import { db } from "@/server/db";
import { revalidatePublicWebsites } from "@/server/revalidate";
import { adminProcedure, router } from "@/server/trpc/trpc";

const websiteSchema = z.object({
  name: z.string().trim().min(1).max(160),
  url: z.string().trim().min(1).max(500).url(),
  category: z.string().trim().min(1).max(120),
  description: z.string().trim().max(300).optional().nullable(),
  sortOrder: z.number().int().min(0).max(9999).optional(),
  status: z.nativeEnum(WebsiteStatus).optional(),
});

const createSchema = websiteSchema;

const updateSchema = websiteSchema.extend({
  id: z.string().min(1),
});

const idSchema = z.object({
  id: z.string().min(1),
});

const normalizeOptionalString = (value?: string | null) => {
  if (value === undefined) return null;
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const getPublishedAt = (
  status: WebsiteStatus,
  previousPublishedAt?: Date | null,
) => {
  if (status === WebsiteStatus.PUBLISHED) {
    return previousPublishedAt ?? new Date();
  }

  return null;
};

export const adminWebsitesRouter = router({
  list: adminProcedure.query(async () =>
    db.website.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { updatedAt: "desc" },
      ],
    }),
  ),
  getById: adminProcedure.input(idSchema).query(async ({ input }) => {
    const website = await db.website.findUnique({
      where: { id: input.id },
    });

    if (!website) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Website not found." });
    }

    return website;
  }),
  create: adminProcedure.input(createSchema).mutation(async ({ input }) => {
    const status = input.status ?? WebsiteStatus.DRAFT;

    const created = await db.website.create({
      data: {
        name: input.name.trim(),
        url: input.url.trim(),
        category: input.category.trim(),
        description: normalizeOptionalString(input.description),
        sortOrder: input.sortOrder ?? 0,
        status,
        publishedAt: getPublishedAt(status),
      },
    });

    revalidatePublicWebsites();
    return created;
  }),
  update: adminProcedure.input(updateSchema).mutation(async ({ input }) => {
    const existing = await db.website.findUnique({
      where: { id: input.id },
    });

    if (!existing) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Website not found." });
    }

    const status = input.status ?? existing.status;

    const updated = await db.website.update({
      where: { id: input.id },
      data: {
        name: input.name.trim(),
        url: input.url.trim(),
        category: input.category.trim(),
        description: normalizeOptionalString(input.description),
        sortOrder: input.sortOrder ?? 0,
        status,
        publishedAt: getPublishedAt(status, existing.publishedAt),
      },
    });

    revalidatePublicWebsites();
    return updated;
  }),
  delete: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const website = await db.website.findUnique({
      where: { id: input.id },
    });

    if (!website) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Website not found." });
    }

    await db.website.delete({ where: { id: input.id } });
    revalidatePublicWebsites();
    return website;
  }),
  publish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const website = await db.website.update({
      where: { id: input.id },
      data: {
        status: WebsiteStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });

    revalidatePublicWebsites();
    return website;
  }),
  unpublish: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const website = await db.website.update({
      where: { id: input.id },
      data: {
        status: WebsiteStatus.DRAFT,
        publishedAt: null,
      },
    });

    revalidatePublicWebsites();
    return website;
  }),
});
