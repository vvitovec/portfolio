import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validation/contact";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
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

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: { code: "validation" }, issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { name, email, company, message, website } = parsed.data;

  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !toEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("Contact form submission (dev)", {
        name,
        email,
        company,
        messageLength: message.length,
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: { code: "email_not_configured" } },
      { status: 500 },
    );
  }

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New contact request from ${name}`,
      reply_to: email,
      text: emailBody,
    }),
  });

  if (!response.ok) {
    const errorText =
      process.env.NODE_ENV !== "production" ? await response.text() : undefined;

    if (errorText) {
      console.error("Resend error:", errorText);
    } else {
      console.error("Resend error: failed to send contact email");
    }

    return NextResponse.json(
      { ok: false, error: { code: "email_failed" } },
      { status: 500 },
    );
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("Contact form submission sent", {
      name,
      email,
      company,
      messageLength: message.length,
    });
  }

  return NextResponse.json({ ok: true });
}
