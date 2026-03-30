"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/react";

const formSchema = z.object({
  name: z.string().trim().min(1, "required").max(160, "max"),
  url: z.string().trim().min(1, "required").max(500, "max").url("url"),
  category: z.string().trim().min(1, "required").max(120, "max"),
  description: z.string().trim().max(300, "max").optional(),
  sortOrder: z.number().int().min(0, "min").max(9999, "max"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type WebsiteFormValues = z.infer<typeof formSchema>;

type WebsiteFormProps = {
  mode: "create" | "edit";
  websiteId?: string;
  initialValues?: WebsiteFormValues;
  onCreated?: (id: string) => void;
};

const defaultValues: WebsiteFormValues = {
  name: "",
  url: "",
  category: "",
  description: "",
  sortOrder: 0,
  status: "DRAFT",
};

const normalizeOptionalString = (value: string) => {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export default function WebsiteForm({
  mode,
  websiteId,
  initialValues,
  onCreated,
}: WebsiteFormProps) {
  const t = useTranslations("admin.websites");
  const utils = trpc.useUtils();
  const form = useForm<WebsiteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? defaultValues,
  });

  const { register, handleSubmit, formState } = form;
  const errors = formState.errors;

  const createMutation = trpc.admin.websites.create.useMutation({
    onSuccess: async (data) => {
      toast.success(t("toast.created"));
      await utils.admin.websites.list.invalidate();
      onCreated?.(data.id);
    },
    onError: () => toast.error(t("toast.error")),
  });

  const updateMutation = trpc.admin.websites.update.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.updated"));
      await utils.admin.websites.list.invalidate();
      if (websiteId) {
        await utils.admin.websites.getById.invalidate({ id: websiteId });
      }
    },
    onError: () => toast.error(t("toast.error")),
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const submitLabel = useMemo(
    () => (isSaving ? t("form.saving") : t("form.save")),
    [isSaving, t],
  );

  const sortOrderField = register("sortOrder", {
    setValueAs: (value) => (value === "" ? 0 : Number(value)),
  });

  const onSubmit = (values: WebsiteFormValues) => {
    const payload = {
      name: values.name.trim(),
      url: values.url.trim(),
      category: values.category.trim(),
      description: normalizeOptionalString(values.description ?? ""),
      sortOrder: values.sortOrder,
      status: values.status,
    };

    if (mode === "create") {
      createMutation.mutate(payload);
      return;
    }

    if (!websiteId) {
      toast.error(t("toast.error"));
      return;
    }

    updateMutation.mutate({
      id: websiteId,
      ...payload,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-2xl border border-border bg-card/80 p-6">
        <div className="mb-6 space-y-1">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {t("form.baseTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("form.baseSubtitle")}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              {t("form.name.label")}
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder={t("form.name.placeholder")}
            />
            {errors.name ? (
              <p className="text-xs text-destructive">
                {errors.name.message === "max"
                  ? t("form.name.errorMax")
                  : t("form.name.errorRequired")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="category">
              {t("form.category.label")}
            </label>
            <Input
              id="category"
              {...register("category")}
              placeholder={t("form.category.placeholder")}
            />
            {errors.category ? (
              <p className="text-xs text-destructive">
                {errors.category.message === "max"
                  ? t("form.category.errorMax")
                  : t("form.category.errorRequired")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="url">
              {t("form.url.label")}
            </label>
            <Input
              id="url"
              {...register("url")}
              placeholder={t("form.url.placeholder")}
            />
            {errors.url ? (
              <p className="text-xs text-destructive">
                {errors.url.message === "max"
                  ? t("form.url.errorMax")
                  : errors.url.message === "url"
                    ? t("form.url.errorUrl")
                    : t("form.url.errorRequired")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="description">
              {t("form.description.label")}
            </label>
            <Textarea
              id="description"
              rows={4}
              {...register("description")}
              placeholder={t("form.description.placeholder")}
            />
            {errors.description ? (
              <p className="text-xs text-destructive">
                {t("form.description.errorMax")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="sortOrder">
              {t("form.sortOrder.label")}
            </label>
            <Input
              id="sortOrder"
              type="number"
              inputMode="numeric"
              min={0}
              max={9999}
              {...sortOrderField}
              placeholder={t("form.sortOrder.placeholder")}
            />
            {errors.sortOrder ? (
              <p className="text-xs text-destructive">
                {t("form.sortOrder.error")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="status">
              {t("form.status.label")}
            </label>
            <select
              id="status"
              {...register("status")}
              className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm outline-none"
            >
              <option value="DRAFT">{t("status.draft")}</option>
              <option value="PUBLISHED">{t("status.published")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
