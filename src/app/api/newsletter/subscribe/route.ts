import { NextResponse } from "next/server";

import { NewsletterEmailStatus, NewsletterEmailType, type Locale } from "@/generated/prisma";
import { newsletterSubscribeSchema } from "@/lib/validation/newsletter";
import { db } from "@/server/db";
import {
  buildConfirmationEmail,
  getNewsletterBaseUrl,
  sendNewsletterEmail,
} from "@/server/newsletter/email";
import { isRateLimited } from "@/server/newsletter/rate-limit";
import {
  createNewsletterToken,
  hashNewsletterToken,
  hashNewsletterValue,
} from "@/server/newsletter/tokens";
import { getClientIp } from "@/server/request-ip";

const genericSuccess = () => NextResponse.json({ ok: true });

function getUserAgent(request: Request) {
  return request.headers.get("user-agent")?.slice(0, 500) ?? null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(`ip:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: { code: "rate_limited" } },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "invalid_json" } },
      { status: 400 },
    );
  }

  const parsed = newsletterSubscribeSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: { code: "validation" }, issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, locale, source, website } = parsed.data;

  if (website && website.trim().length > 0) {
    return genericSuccess();
  }

  if (isRateLimited(`email:${email}`)) {
    return NextResponse.json(
      { ok: false, error: { code: "rate_limited" } },
      { status: 429 },
    );
  }

  const existing = await db.newsletterSubscriber.findUnique({
    where: { email },
    select: { id: true, status: true },
  });

  if (existing?.status === "CONFIRMED") {
    return genericSuccess();
  }

  const confirmationToken = createNewsletterToken();
  const unsubscribeToken = createNewsletterToken();
  const confirmationTokenHash = hashNewsletterToken(confirmationToken);
  const ipHash = ip === "unknown" ? null : hashNewsletterValue(ip);
  const userAgent = getUserAgent(request);

  const subscriber = await db.newsletterSubscriber.upsert({
    where: { email },
    update: {
      locale: locale as Locale,
      source,
      status: "PENDING",
      confirmationTokenHash,
      unsubscribeToken,
      ipHash,
      userAgent,
      consentAt: new Date(),
      confirmedAt: null,
      unsubscribedAt: null,
    },
    create: {
      email,
      locale: locale as Locale,
      source,
      status: "PENDING",
      confirmationTokenHash,
      unsubscribeToken,
      ipHash,
      userAgent,
    },
  });

  const confirmUrl = `${getNewsletterBaseUrl()}/api/newsletter/confirm/${confirmationToken}`;
  const confirmationEmail = buildConfirmationEmail({
    locale: subscriber.locale,
    confirmUrl,
  });
  const result = await sendNewsletterEmail({
    to: subscriber.email,
    subject: confirmationEmail.subject,
    html: confirmationEmail.html,
    text: confirmationEmail.text,
    tags: [
      { name: "category", value: "newsletter" },
      { name: "type", value: "confirmation" },
    ],
  });

  await db.newsletterEmailEvent.create({
    data: {
      subscriberId: subscriber.id,
      type: NewsletterEmailType.CONFIRMATION,
      status: result.ok ? NewsletterEmailStatus.SENT : NewsletterEmailStatus.FAILED,
      toEmail: subscriber.email,
      subject: confirmationEmail.subject,
      resendEmailId: result.ok ? result.id : null,
      errorMessage: result.ok ? null : result.error,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: { code: "email_failed" } },
      { status: 500 },
    );
  }

  return genericSuccess();
}
