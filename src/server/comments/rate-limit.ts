import 'server-only';

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export function isCommentRateLimited(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= max) {
    return true;
  }

  entry.count += 1;
  return false;
}
