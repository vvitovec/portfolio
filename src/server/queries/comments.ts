import 'server-only';

import { unstable_cache, unstable_noStore } from 'next/cache';

import { CommentStatus, CommentTargetType, type Locale } from '@/generated/prisma';
import { db } from '@/server/db';
import {
  isDatabaseUnavailableError,
  logPublicQueryFallback,
} from '@/server/queries/public-query-error';

const REVALIDATE_SECONDS = 300;

export type CommentView = {
  id: string;
  parentId: string | null;
  authorName: string | null;
  body: string;
  isAdmin: boolean;
  createdAt: Date | string;
  replies: CommentView[];
};

export type CommentsForTargetView = {
  threadId: string | null;
  comments: CommentView[];
};

export type CommunityThreadView = {
  id: string;
  targetType: CommentTargetType;
  targetSlug: string;
  title: string;
  path: string;
  lastCommentAt: Date | string;
  commentCount: number;
  latestComment: {
    id: string;
    authorName: string | null;
    body: string;
    isAdmin: boolean;
    createdAt: Date | string;
  } | null;
};

type FlatComment = Omit<CommentView, 'replies'>;

function buildCommentTree(comments: FlatComment[]): CommentView[] {
  const byId = new Map<string, CommentView>();
  const roots: CommentView[] = [];

  for (const comment of comments) {
    byId.set(comment.id, { ...comment, replies: [] });
  }

  for (const comment of byId.values()) {
    if (comment.parentId) {
      const parent = byId.get(comment.parentId);
      if (parent) {
        parent.replies.push(comment);
        continue;
      }
    }

    roots.push(comment);
  }

  return roots;
}

function getTargetPath(targetType: CommentTargetType, slug: string) {
  return targetType === CommentTargetType.BLOG_POST ? `/blog/${slug}` : `/projects/${slug}`;
}

const getCommentsForTargetFetcher = async (
  targetType: CommentTargetType,
  targetSlug: string,
): Promise<CommentsForTargetView> => {
  try {
    const thread = await db.communityThread.findUnique({
      where: { targetType_targetSlug: { targetType, targetSlug } },
      select: {
        id: true,
        comments: {
          where: { status: CommentStatus.VISIBLE },
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            parentId: true,
            authorName: true,
            body: true,
            isAdmin: true,
            createdAt: true,
          },
        },
      },
    });

    if (!thread) {
      return { threadId: null, comments: [] };
    }

    return {
      threadId: thread.id,
      comments: buildCommentTree(thread.comments),
    };
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    logPublicQueryFallback(`Failed to load comments for ${targetType}:${targetSlug}`, error);
    return { threadId: null, comments: [] };
  }
};

const getCommunityThreadsFetcher = async (
  locale: Locale,
  limit: number,
): Promise<CommunityThreadView[]> => {
  try {
    const threads = await db.communityThread.findMany({
      where: { comments: { some: { status: CommentStatus.VISIBLE } } },
      take: limit,
      orderBy: { lastCommentAt: 'desc' },
      select: {
        id: true,
        targetType: true,
        targetSlug: true,
        title: true,
        lastCommentAt: true,
        comments: {
          where: { status: CommentStatus.VISIBLE },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            authorName: true,
            body: true,
            isAdmin: true,
            createdAt: true,
          },
        },
      },
    });

    return threads.map((thread) => ({
      id: thread.id,
      targetType: thread.targetType,
      targetSlug: thread.targetSlug,
      title: thread.title,
      path: getTargetPath(thread.targetType, thread.targetSlug),
      lastCommentAt: thread.lastCommentAt,
      commentCount: thread.comments.length,
      latestComment: thread.comments[0] ?? null,
    }));
  } catch (error) {
    if (!isDatabaseUnavailableError(error)) {
      throw error;
    }

    logPublicQueryFallback(`Failed to load community threads for ${locale}`, error);
    return [];
  }
};

export async function getCommentsForTarget(
  targetType: CommentTargetType,
  targetSlug: string,
): Promise<CommentsForTargetView> {
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore();
    return getCommentsForTargetFetcher(targetType, targetSlug);
  }

  const cached = unstable_cache(getCommentsForTargetFetcher, ['comments', targetType, targetSlug], {
    revalidate: REVALIDATE_SECONDS,
    tags: ['comments', 'community', `comments:${targetType}:${targetSlug}`],
  });

  return cached(targetType, targetSlug);
}

export async function getCommunityThreads(
  locale: Locale,
  limit = 50,
): Promise<CommunityThreadView[]> {
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore();
    return getCommunityThreadsFetcher(locale, limit);
  }

  const cached = unstable_cache(getCommunityThreadsFetcher, ['community', locale], {
    revalidate: REVALIDATE_SECONDS,
    tags: ['comments', 'community', `community:${locale}`],
  });

  return cached(locale, limit);
}
