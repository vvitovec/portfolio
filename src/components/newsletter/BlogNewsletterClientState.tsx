"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import BlogNewsletterPopup from "@/components/newsletter/BlogNewsletterPopup";

const NEWSLETTER_STATUSES = new Set(["confirmed", "unsubscribed", "invalid"]);

export default function BlogNewsletterClientState() {
  const t = useTranslations("blog");
  const searchParams = useSearchParams();
  const status = searchParams.get("newsletter");

  if (!status || !NEWSLETTER_STATUSES.has(status)) {
    return <BlogNewsletterPopup />;
  }

  return (
    <div className="mt-8 max-w-3xl rounded-2xl border border-border/60 bg-card/80 p-5 text-sm text-muted-foreground">
      {t(`newsletter.status.${status}`)}
    </div>
  );
}
