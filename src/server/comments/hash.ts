import 'server-only';

import crypto from 'node:crypto';

export function hashCommentValue(value: string) {
  const secret =
    process.env.COMMENT_HASH_SECRET ??
    process.env.NEWSLETTER_HASH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    'portfolio-comments-dev';

  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}
