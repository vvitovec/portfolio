import 'server-only';

import { CommentStatus } from '@/generated/prisma';
import { db } from '@/server/db';
import { revalidatePublicComments } from '@/server/revalidate';

export async function refreshThreadActivity(threadId: string) {
  const [latestVisible, thread] = await Promise.all([
    db.comment.findFirst({
      where: { threadId, status: CommentStatus.VISIBLE },
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    }),
    db.communityThread.findUnique({
      where: { id: threadId },
      select: {
        id: true,
        targetType: true,
        targetSlug: true,
        createdAt: true,
      },
    }),
  ]);

  if (!thread) {
    return null;
  }

  await db.communityThread.update({
    where: { id: thread.id },
    data: { lastCommentAt: latestVisible?.createdAt ?? thread.createdAt },
  });

  revalidatePublicComments({
    targetType: thread.targetType,
    slug: thread.targetSlug,
  });

  return thread;
}
