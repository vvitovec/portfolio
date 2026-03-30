"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";

import { type ContactFormValues, contactSchema } from "@/lib/validation/contact";

type FieldName = "name" | "email" | "company" | "message";

type FieldErrors = Partial<Record<FieldName, string>>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

function mapIssuesToErrors(
  issues: z.ZodIssue[],
  t: (key: string) => string,
): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];

    if (
      field !== "name" &&
      field !== "email" &&
      field !== "company" &&
      field !== "message"
    ) {
      continue;
    }

    if (errors[field]) {
      continue;
    }

    const message = issue.message;

  if (field === "name") {
      errors.name = t(
        message === "required"
          ? "form.name.errorRequired"
          : message === "max"
            ? "form.name.errorMax"
            : "form.name.errorMin",
      );
      continue;
    }

    if (field === "email") {
      errors.email = t(
        message === "required"
          ? "form.email.errorRequired"
          : message === "max"
            ? "form.email.errorMax"
            : "form.email.errorInvalid",
      );
      continue;
    }

    if (field === "company") {
      errors.company = t("form.company.errorMax");
      continue;
    }

    if (field === "message") {
      errors.message = t(
        message === "required"
          ? "form.message.errorRequired"
          : message === "max"
            ? "form.message.errorMax"
            : "form.message.errorMin",
      );
    }
  }

  return errors;
}

const inputClass =
  "h-12 w-full rounded-xl border border-border/60 bg-background/80 px-4 text-sm shadow-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-accent-gold/40 focus:ring-2 focus:ring-accent-gold/20";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [formError, setFormError] = useState<string | null>(null);

  const isSubmitting = status === "submitting";

  const submitLabel = useMemo(
    () => (isSubmitting ? t("form.sending") : t("form.submit")),
    [isSubmitting, t],
  );

  const handleChange = (
    field: keyof ContactFormValues,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      setErrors(mapIssuesToErrors(parsed.error.issues, t));
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        setStatus("success");
        setValues(initialValues);
        return;
      }

      if (response.status === 429) {
        setFormError(t("form.errorRateLimit"));
        setStatus("idle");
        return;
      }

      if (response.status === 400) {
        const data = (await response.json()) as {
          issues?: z.ZodIssue[];
        };
        if (data.issues) {
          setErrors(mapIssuesToErrors(data.issues, t));
          setStatus("idle");
          return;
        }
      }

      setFormError(t("form.errorMessage"));
      setStatus("idle");
    } catch {
      setFormError(t("form.errorMessage"));
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center" role="status">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {t("form.successTitle")}
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          {t("form.successMessage")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent-gold/30 hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("form.successAction")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      aria-describedby={formError ? "contact-form-error" : undefined}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="name">
            {t("form.name.label")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder={t("form.name.placeholder")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
            className={inputClass}
          />
          {errors.name ? (
            <p
              id="name-error"
              className="text-xs font-medium text-destructive"
            >
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
            {t("form.email.label")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder={t("form.email.placeholder")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
            className={inputClass}
          />
          {errors.email ? (
            <p
              id="email-error"
              className="text-xs font-medium text-destructive"
            >
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="company">
          {t("form.company.label")}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={values.company ?? ""}
          onChange={(event) => handleChange("company", event.target.value)}
          placeholder={t("form.company.placeholder")}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
          autoComplete="organization"
          className={inputClass}
        />
        {errors.company ? (
          <p
            id="company-error"
            className="text-xs font-medium text-destructive"
          >
            {errors.company}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="message">
          {t("form.message.label")}
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          placeholder={t("form.message.placeholder")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          rows={6}
          className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm shadow-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/50 focus:border-accent-gold/40 focus:ring-2 focus:ring-accent-gold/20"
        />
        {errors.message ? (
          <p
            id="message-error"
            className="text-xs font-medium text-destructive"
          >
            {errors.message}
          </p>
        ) : null}
      </div>
      <div
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">{t("form.honeypotLabel")}</label>
        <input
          id="website"
          name="website"
          type="text"
          value={values.website ?? ""}
          onChange={(event) => handleChange("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {formError ? (
        <p
          id="contact-form-error"
          className="text-sm font-medium text-destructive"
          role="status"
        >
          {formError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-accent-gold-foreground shadow-sm transition-all duration-300 hover:shadow-[0_4px_20px_oklch(0.78_0.155_75/0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {submitLabel}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
