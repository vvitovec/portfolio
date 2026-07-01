import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { CommentStatus } from '@/generated/prisma';
import { refreshThreadActivity } from '@/server/comments/activity';
import { db } from '@/server/db';
import { adminProcedure, router } from '@/server/trpc/trpc';

const listSchema = z
  .object({
    statuses: z.array(z.nativeEnum(CommentStatus)).optional(),
    limit: z.number().int().min(1).max(200).optional().default(100),
  })
  .optional();

const idSchema = z.object({
  id: z.string().min(1),
});

const setStatusSchema = idSchema.extend({
  status: z.nativeEnum(CommentStatus),
});

const replySchema = z.object({
  threadId: z.string().min(1),
  parentId: z.string().min(1).optional().nullable(),
  body: z.string().trim().min(2).max(2000),
});

const blockIpSchema = z.object({
  commentId: z.string().min(1),
  reason: z.string().trim().max(500).optional().nullable(),
});

const unblockIpSchema = z.object({
  ipHash: z.string().min(1),
});

function getAdminName(login?: string | null) {
  return login?.trim() || 'Viktor';
}

export const adminCommentsRouter = router({
  list: adminProcedure.input(listSchema).query(async ({ input }) =>
    db.comment.findMany({
      take: input?.limit ?? 100,
      where: input?.statuses?.length ? { status: { in: input.statuses } } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        thread: {
          select: {
            id: true,
            targetType: true,
            targetSlug: true,
            title: true,
          },
        },
      },
    }),
  ),
  blocks: adminProcedure.query(async () =>
    db.commentIpBlock.findMany({
      orderBy: [{ active: 'desc' }, { createdAt: 'desc' }],
      take: 100,
    }),
  ),
  reply: adminProcedure.input(replySchema).mutation(async ({ ctx, input }) => {
    const thread = await db.communityThread.findUnique({
      where: { id: input.threadId },
      select: { id: true },
    });

    if (!thread) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Thread not found.' });
    }

    let parentId = input.parentId?.trim() || null;
    if (parentId) {
      const parent = await db.comment.findFirst({
        where: {
          id: parentId,
          threadId: thread.id,
          status: { not: CommentStatus.DELETED },
        },
        select: { id: true },
      });

      if (!parent) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Parent not found.' });
      }

      parentId = parent.id;
    }

    const comment = await db.comment.create({
      data: {
        threadId: thread.id,
        parentId,
        body: input.body.trim(),
        authorName: getAdminName(ctx.session?.user?.login),
        isAdmin: true,
        status: CommentStatus.VISIBLE,
        moderationStatus: 'PASSED',
        moderationSource: 'admin',
        moderationCheckedAt: new Date(),
      },
    });

    await refreshThreadActivity(thread.id);
    return comment;
  }),
  setStatus: adminProcedure.input(setStatusSchema).mutation(async ({ input }) => {
    const existing = await db.comment.findUnique({
      where: { id: input.id },
      select: { id: true, threadId: true },
    });

    if (!existing) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Comment not found.' });
    }

    const updated = await db.comment.update({
      where: { id: input.id },
      data: {
        status: input.status,
        deletedAt: input.status === CommentStatus.DELETED ? new Date() : null,
      },
    });

    await refreshThreadActivity(existing.threadId);
    return updated;
  }),
  hardDelete: adminProcedure.input(idSchema).mutation(async ({ input }) => {
    const existing = await db.comment.findUnique({
      where: { id: input.id },
      select: { threadId: true },
    });

    if (!existing) {
      throw new TRPCError({ code: 'BAD_REQUEST', message: 'Comment not found.' });
    }

    await db.comment.delete({ where: { id: input.id } });
    await refreshThreadActivity(existing.threadId);
    return { ok: true };
  }),
  blockIp: adminProcedure.input(blockIpSchema).mutation(async ({ ctx, input }) => {
    const comment = await db.comment.findUnique({
      where: { id: input.commentId },
      select: { ipHash: true },
    });

    if (!comment?.ipHash) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'This comment has no IP hash.',
      });
    }

    return db.commentIpBlock.upsert({
      where: { ipHash: comment.ipHash },
      update: {
        active: true,
        reason: input.reason?.trim() || null,
        createdBy: getAdminName(ctx.session?.user?.login),
      },
      create: {
        ipHash: comment.ipHash,
        reason: input.reason?.trim() || null,
        createdBy: getAdminName(ctx.session?.user?.login),
      },
    });
  }),
  unblockIp: adminProcedure.input(unblockIpSchema).mutation(async ({ input }) =>
    db.commentIpBlock.update({
      where: { ipHash: input.ipHash },
      data: { active: false },
    }),
  ),
});
