import crypto from "node:crypto";

const TOKEN_BYTES = 32;

export function createNewsletterToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString("base64url");
}

export function hashNewsletterToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function hashNewsletterValue(value: string) {
  const secret =
    process.env.NEWSLETTER_HASH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "portfolio-newsletter-dev";

  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}
