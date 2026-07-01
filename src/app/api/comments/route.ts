import { NextResponse } from 'next/server';

import { CommentStatus, CommentTargetType, type Locale } from '@/generated/prisma';
import { commentSubmitSchema } from '@/lib/validation/comments';
import { refreshThreadActivity } from '@/server/comments/activity';
import { hashCommentValue } from '@/server/comments/hash';
import { moderateComment } from '@/server/comments/moderation';
import { isCommentRateLimited } from '@/server/comments/rate-limit';
import { resolveCommentTarget } from '@/server/comments/targets';
import { db } from '@/server/db';
import { getClientIp } from '@/server/request-ip';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_PER_IP = 5;
const RATE_LIMIT_MAX_PER_THREAD = 3;

const genericSuccess = () => NextResponse.json({ ok: true, status: 'RECEIVED' as const });

function normalizeOptionalString(value?: string | null) {
  const trimmed = value?.trim() ?? '';
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeBody(value: string) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function getUserAgent(request: Request) {
  return request.headers.get('user-agent')?.slice(0, 500) ?? null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const ipHash = ip === 'unknown' ? null : hashCommentValue(ip);

  if (
    isCommentRateLimited(`comment:ip:${ip}`, {
      max: RATE_LIMIT_MAX_PER_IP,
      windowMs: RATE_LIMIT_WINDOW_MS,
    })
  ) {
    return NextResponse.json({ ok: false, error: { code: 'rate_limited' } }, { status: 429 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: { code: 'invalid_json' } }, { status: 400 });
  }

  const parsed = commentSubmitSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: { code: 'validation' }, issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const input = parsed.data;

  if (input.website && input.website.trim().length > 0) {
    return genericSuccess();
  }

  if (ipHash) {
    const block = await db.commentIpBlock.findUnique({
      where: { ipHash },
      select: { active: true },
    });

    if (block?.active) {
      return NextResponse.json({ ok: false, error: { code: 'blocked' } }, { status: 403 });
    }
  }

  const targetType = input.targetType as CommentTargetType;
  const locale = input.locale as Locale;
  const target = await resolveCommentTarget({
    targetType,
    targetSlug: input.targetSlug,
    locale,
  });

  if (!target) {
    return NextResponse.json({ ok: false, error: { code: 'target_not_found' } }, { status: 404 });
  }

  if (
    isCommentRateLimited(`comment:thread:${ip}:${target.type}:${target.slug}`, {
      max: RATE_LIMIT_MAX_PER_THREAD,
      windowMs: RATE_LIMIT_WINDOW_MS,
    })
  ) {
    return NextResponse.json({ ok: false, error: { code: 'rate_limited' } }, { status: 429 });
  }

  const body = normalizeBody(input.body);
  const authorName = normalizeOptionalString(input.authorName);
  const moderation = await moderateComment(body);

  const thread = await db.communityThread.upsert({
    where: {
      targetType_targetSlug: {
        targetType: target.type,
        targetSlug: target.slug,
      },
    },
    update: { title: target.title },
    create: {
      targetType: target.type,
      targetSlug: target.slug,
      title: target.title,
      ...(target.type === CommentTargetType.BLOG_POST
        ? { blogPostId: target.id }
        : { projectId: target.id }),
    },
    select: { id: true },
  });

  let parentId = normalizeOptionalString(input.parentId);

  if (parentId) {
    const parent = await db.comment.findFirst({
      where: {
        id: parentId,
        threadId: thread.id,
        status: CommentStatus.VISIBLE,
      },
      select: { id: true },
    });

    if (!parent) {
      return NextResponse.json({ ok: false, error: { code: 'parent_not_found' } }, { status: 404 });
    }

    parentId = parent.id;
  }

  const comment = await db.comment.create({
    data: {
      threadId: thread.id,
      parentId,
      authorName,
      body,
      status: moderation.commentStatus,
      moderationStatus: moderation.moderationStatus,
      moderationSource: moderation.source,
      moderationReason: moderation.reason,
      moderationCategories: moderation.categories ?? undefined,
      moderationCheckedAt: new Date(),
      ipHash,
      userAgent: getUserAgent(request),
    },
    select: { status: true },
  });

  if (comment.status === CommentStatus.VISIBLE) {
    await refreshThreadActivity(thread.id);
  }

  return NextResponse.json({
    ok: true,
    status: comment.status === CommentStatus.VISIBLE ? 'VISIBLE' : 'REVIEW',
  });
}
