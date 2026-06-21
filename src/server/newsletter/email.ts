import "server-only";

import type { Locale } from "@/generated/prisma";

type ResendTag = {
  name: string;
  value: string;
};

type SendNewsletterEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
  tags?: ResendTag[];
};

type SendNewsletterEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export function getNewsletterBaseUrl() {
  const value =
    process.env.NEWSLETTER_BASE_URL ??
    process.env.PORTFOLIO_REVALIDATE_BASE_URL ??
    process.env.NEXTAUTH_URL ??
    "https://www.vvitovec.com";

  return value.replace(/\/$/, "");
}

export function getNewsletterFromEmail() {
  return process.env.NEWSLETTER_FROM_EMAIL ?? "Viktor Vitovec Blog <blog@vvitovec.com>";
}

export function getNewsletterReplyToEmail() {
  return process.env.NEWSLETTER_REPLY_TO_EMAIL ?? "blog@vvitovec.com";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeExcerpt(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 420);
}

export async function sendNewsletterEmail({
  to,
  subject,
  html,
  text,
  tags,
}: SendNewsletterEmailInput): Promise<SendNewsletterEmailResult> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("Newsletter email skipped without RESEND_API_KEY", {
        to,
        subject,
      });
      return { ok: true, id: "dev-skipped" };
    }

    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getNewsletterFromEmail(),
      to: [to],
      subject,
      html,
      text,
      reply_to: getNewsletterReplyToEmail(),
      tags,
    }),
  });

  const body = (await response.json().catch(() => null)) as
    | { id?: string; message?: string; error?: string }
    | null;

  if (!response.ok) {
    return {
      ok: false,
      error: body?.message ?? body?.error ?? "Resend rejected the email.",
    };
  }

  return { ok: true, id: body?.id ?? "unknown" };
}

export function buildConfirmationEmail({
  locale,
  confirmUrl,
}: {
  locale: Locale;
  confirmUrl: string;
}) {
  const subject =
    locale === "cs"
      ? "Potvrzeni odberu blogu"
      : "Confirm your blog subscription";
  const title =
    locale === "cs"
      ? "Potvrdte odber blogu"
      : "Confirm your blog subscription";
  const intro =
    locale === "cs"
      ? "Kliknutim na odkaz nize potvrdite, ze chcete dostavat nove clanky od Viktora Vitovce."
      : "Click the link below to confirm that you want to receive new posts from Viktor Vitovec.";
  const button = locale === "cs" ? "Potvrdit odber" : "Confirm subscription";
  const footer =
    locale === "cs"
      ? "Pokud jste se neprihlasili vy, tento email ignorujte."
      : "If you did not request this, you can ignore this email.";

  return {
    subject,
    text: `${title}\n\n${intro}\n\n${confirmUrl}\n\n${footer}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#1f2933;max-width:620px">
        <h1 style="font-size:24px;line-height:1.25;margin:0 0 16px">${escapeHtml(title)}</h1>
        <p style="margin:0 0 24px">${escapeHtml(intro)}</p>
        <p style="margin:0 0 24px">
          <a href="${escapeHtml(confirmUrl)}" style="display:inline-block;border-radius:999px;background:#111827;color:#ffffff;padding:12px 18px;text-decoration:none;font-weight:700">${escapeHtml(button)}</a>
        </p>
        <p style="color:#6b7280;font-size:14px;margin:0">${escapeHtml(footer)}</p>
      </div>
    `,
  };
}

export function buildBlogPostEmail({
  locale,
  title,
  excerpt,
  contentMarkdown,
  postUrl,
  unsubscribeUrl,
}: {
  locale: Locale;
  title: string;
  excerpt: string | null;
  contentMarkdown: string;
  postUrl: string;
  unsubscribeUrl: string;
}) {
  const subjectPrefix = locale === "cs" ? "Novy clanek" : "New note";
  const cta = locale === "cs" ? "Precist clanek" : "Read the post";
  const unsubscribe =
    locale === "cs"
      ? "Odhlasit odber blogu"
      : "Unsubscribe from blog emails";
  const summary = excerpt?.trim() || normalizeExcerpt(contentMarkdown);
  const subject = `${subjectPrefix}: ${title}`;

  return {
    subject,
    text: `${title}\n\n${summary}\n\n${postUrl}\n\n${unsubscribe}: ${unsubscribeUrl}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#1f2933;max-width:680px">
        <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#6b7280;margin:0 0 10px">${escapeHtml(subjectPrefix)}</p>
        <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px">${escapeHtml(title)}</h1>
        <p style="font-size:16px;margin:0 0 24px">${escapeHtml(summary)}</p>
        <p style="margin:0 0 32px">
          <a href="${escapeHtml(postUrl)}" style="display:inline-block;border-radius:999px;background:#111827;color:#ffffff;padding:12px 18px;text-decoration:none;font-weight:700">${escapeHtml(cta)}</a>
        </p>
        <p style="color:#6b7280;font-size:13px;margin:0">
          <a href="${escapeHtml(unsubscribeUrl)}" style="color:#6b7280">${escapeHtml(unsubscribe)}</a>
        </p>
      </div>
    `,
  };
}
