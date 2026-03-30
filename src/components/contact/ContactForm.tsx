"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
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
      <div className="space-y-4 text-foreground" role="status">
        <h2 className="font-display text-2xl font-semibold">
          {t("form.successTitle")}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {t("form.successMessage")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:duration-200 motion-safe:transition-colors motion-reduce:transition-none hover:bg-muted"
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
          <label className="text-sm font-medium" htmlFor="name">
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
            className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-200 motion-safe:transition motion-reduce:transition-none"
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
          <label className="text-sm font-medium" htmlFor="email">
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
            className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-200 motion-safe:transition motion-reduce:transition-none"
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
        <label className="text-sm font-medium" htmlFor="company">
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
          className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-200 motion-safe:transition motion-reduce:transition-none"
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
        <label className="text-sm font-medium" htmlFor="message">
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
          className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-200 motion-safe:transition motion-reduce:transition-none"
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
        className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-safe:duration-200 motion-safe:transition motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitLabel}
      </button>
    </form>
  );
}
