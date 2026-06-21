"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  newsletterSubscribeSchema,
  type NewsletterSubscribeValues,
} from "@/lib/validation/newsletter";

type FormStatus = "idle" | "submitting" | "success";

const initialValues: NewsletterSubscribeValues = {
  email: "",
  locale: "en",
  source: "blog",
  website: "",
};

function mapEmailError(issues: z.ZodIssue[], t: (key: string) => string) {
  const emailIssue = issues.find((issue) => issue.path[0] === "email");
  if (!emailIssue) {
    return null;
  }

  if (emailIssue.message === "required") {
    return t("email.errorRequired");
  }

  if (emailIssue.message === "max") {
    return t("email.errorMax");
  }

  return t("email.errorInvalid");
}

export default function NewsletterSignupForm() {
  const locale = useLocale();
  const t = useTranslations("blog.newsletter");
  const [values, setValues] = useState<NewsletterSubscribeValues>({
    ...initialValues,
    locale: locale === "cs" ? "cs" : "en",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const isSubmitting = status === "submitting";
  const submitLabel = useMemo(
    () => (isSubmitting ? t("submitting") : t("submit")),
    [isSubmitting, t],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError(null);
    setFormError(null);

    const parsed = newsletterSubscribeSchema.safeParse({
      ...values,
      locale: locale === "cs" ? "cs" : "en",
      source: "blog",
    });

    if (!parsed.success) {
      setEmailError(mapEmailError(parsed.error.issues, t));
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        setStatus("success");
        setValues({ ...initialValues, locale: locale === "cs" ? "cs" : "en" });
        return;
      }

      if (response.status === 429) {
        setFormError(t("errorRateLimit"));
        setStatus("idle");
        return;
      }

      if (response.status === 400) {
        const data = (await response.json()) as { issues?: z.ZodIssue[] };
        if (data.issues) {
          setEmailError(mapEmailError(data.issues, t));
          setStatus("idle");
          return;
        }
      }

      setFormError(t("errorMessage"));
      setStatus("idle");
    } catch {
      setFormError(t("errorMessage"));
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mt-10 max-w-3xl rounded-2xl border border-border/60 bg-card/80 p-6"
        role="status"
      >
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {t("successTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-10 max-w-3xl rounded-2xl border border-border/60 bg-card/80 p-6"
      aria-describedby={formError ? "newsletter-error" : undefined}
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="newsletter-email">
            {t("email.label")}
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            placeholder={t("email.placeholder")}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "newsletter-email-error" : undefined}
            autoComplete="email"
            disabled={isSubmitting}
          />
          {emailError ? (
            <p id="newsletter-email-error" className="text-xs font-medium text-destructive">
              {emailError}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">{t("helper")}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
      <label className="sr-only" htmlFor="newsletter-website">
        {t("honeypotLabel")}
      </label>
      <input
        id="newsletter-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={values.website ?? ""}
        onChange={(event) =>
          setValues((current) => ({
            ...current,
            website: event.target.value,
          }))
        }
        className="hidden"
      />
      {formError ? (
        <p id="newsletter-error" className="mt-4 text-sm font-medium text-destructive">
          {formError}
        </p>
      ) : null}
    </form>
  );
}
