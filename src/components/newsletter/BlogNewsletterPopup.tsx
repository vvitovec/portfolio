"use client";

import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { useTranslations } from "next-intl";

import NewsletterSignupForm from "@/components/newsletter/NewsletterSignupForm";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "portfolio-blog-newsletter-popup-v1";

export default function BlogNewsletterPopup() {
  const t = useTranslations("blog.newsletter");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      return;
    }

    const timeout = window.setTimeout(() => setIsOpen(true), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  function rememberAndClose() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Ignore storage failures; the popup still closes for this render.
    }

    setIsOpen(false);
  }

  function rememberSuccess() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "subscribed");
    } catch {
      // Ignore storage failures.
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-foreground/25 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-8"
      role="presentation"
    >
      <div
        aria-modal="true"
        className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl sm:p-8"
        role="dialog"
      >
        <Button
          aria-label={t("popupClose")}
          className="absolute right-4 top-4 h-9 w-9 rounded-full p-0"
          onClick={rememberAndClose}
          type="button"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="mb-6 flex items-start gap-4 pr-10">
          <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("popupLabel")}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
              {t("popupTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t("popupSubtitle")}
            </p>
          </div>
        </div>
        <NewsletterSignupForm
          onSuccess={rememberSuccess}
          source="blog-popup"
          variant="modal"
        />
      </div>
    </div>
  );
}
