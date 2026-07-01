import 'server-only';

import { CommentModerationStatus, CommentStatus, type Prisma } from '@/generated/prisma';
import { openai } from '@/server/openai/client';

type ModerationResult = {
  commentStatus: CommentStatus;
  moderationStatus: CommentModerationStatus;
  source: string;
  reason: string | null;
  categories: Prisma.InputJsonValue | null;
};

const URL_PATTERN = /https?:\/\/|www\.|[a-z0-9-]+\.[a-z]{2,}(?:\/|\b)/gi;
const SPAM_PATTERN =
  /\b(?:casino|viagra|porn|xxx|free\s+money|crypto\s+airdrop|loan|seo\s+backlinks?)\b/i;
const SCRIPT_PATTERN = /<\s*\/?\s*(?:script|iframe|object|embed|style)\b/i;
const REPEATED_CHARACTER_PATTERN = /(.)\1{12,}/;

const blockedOpenAICategories = new Set([
  'sexual/minors',
  'self-harm/instructions',
  'hate/threatening',
  'harassment/threatening',
  'illicit/violent',
  'violence/graphic',
]);

function localModeration(body: string): ModerationResult | null {
  const urlMatches = body.match(URL_PATTERN) ?? [];

  if (SCRIPT_PATTERN.test(body)) {
    return {
      commentStatus: CommentStatus.BLOCKED,
      moderationStatus: CommentModerationStatus.BLOCKED,
      source: 'local',
      reason: 'script_like_content',
      categories: { scriptLikeContent: true },
    };
  }

  if (urlMatches.length >= 4 || SPAM_PATTERN.test(body)) {
    return {
      commentStatus: CommentStatus.BLOCKED,
      moderationStatus: CommentModerationStatus.BLOCKED,
      source: 'local',
      reason: urlMatches.length >= 4 ? 'too_many_links' : 'spam_keywords',
      categories: { urlCount: urlMatches.length, spamPattern: SPAM_PATTERN.test(body) },
    };
  }

  if (urlMatches.length >= 2 || REPEATED_CHARACTER_PATTERN.test(body)) {
    return {
      commentStatus: CommentStatus.PENDING_REVIEW,
      moderationStatus: CommentModerationStatus.FLAGGED,
      source: 'local',
      reason: urlMatches.length >= 2 ? 'multiple_links' : 'repeated_characters',
      categories: {
        urlCount: urlMatches.length,
        repeatedCharacters: REPEATED_CHARACTER_PATTERN.test(body),
      },
    };
  }

  return null;
}

export async function moderateComment(body: string): Promise<ModerationResult> {
  const localResult = localModeration(body);
  if (localResult) {
    return localResult;
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      commentStatus: CommentStatus.VISIBLE,
      moderationStatus: CommentModerationStatus.UNCHECKED,
      source: 'local',
      reason: 'openai_not_configured',
      categories: null,
    };
  }

  try {
    const response = await openai.moderations.create({
      model: 'omni-moderation-latest',
      input: body,
    });
    const result = response.results[0];

    if (!result) {
      return {
        commentStatus: CommentStatus.VISIBLE,
        moderationStatus: CommentModerationStatus.UNCHECKED,
        source: 'openai',
        reason: 'empty_moderation_result',
        categories: null,
      };
    }

    const categories = result.categories as unknown as Record<string, boolean | null>;
    const flaggedCategories = Object.entries(categories)
      .filter(([, value]) => value === true)
      .map(([key]) => key);
    const shouldBlock = flaggedCategories.some((category) => blockedOpenAICategories.has(category));

    if (shouldBlock) {
      return {
        commentStatus: CommentStatus.BLOCKED,
        moderationStatus: CommentModerationStatus.BLOCKED,
        source: response.model,
        reason: flaggedCategories.join(','),
        categories: {
          categories: result.categories,
          categoryScores: result.category_scores,
        } as unknown as Prisma.InputJsonValue,
      };
    }

    if (result.flagged) {
      return {
        commentStatus: CommentStatus.PENDING_REVIEW,
        moderationStatus: CommentModerationStatus.FLAGGED,
        source: response.model,
        reason: flaggedCategories.join(',') || 'flagged',
        categories: {
          categories: result.categories,
          categoryScores: result.category_scores,
        } as unknown as Prisma.InputJsonValue,
      };
    }

    return {
      commentStatus: CommentStatus.VISIBLE,
      moderationStatus: CommentModerationStatus.PASSED,
      source: response.model,
      reason: null,
      categories: {
        categories: result.categories,
        categoryScores: result.category_scores,
      } as unknown as Prisma.InputJsonValue,
    };
  } catch (error) {
    console.error('Comment moderation failed', error);
    return {
      commentStatus: CommentStatus.VISIBLE,
      moderationStatus: CommentModerationStatus.UNCHECKED,
      source: 'openai',
      reason: 'moderation_failed',
      categories: null,
    };
  }
}
