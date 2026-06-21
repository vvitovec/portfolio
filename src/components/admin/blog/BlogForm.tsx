"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import BlobImageUploader from "@/components/admin/BlobImageUploader";
import TagInput from "@/components/admin/projects/TagInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { isHttpUrl, isSafePublicImageUrl } from "@/lib/url-safety";
import { trpc } from "@/trpc/react";

const translationSchema = z.object({
  title: z.string().trim().min(1, "required").max(180, "max"),
  excerpt: z.string().trim().max(500, "max").optional(),
  contentMarkdown: z.string().trim().min(1, "required").max(30000, "max"),
  seoTitle: z.string().trim().max(180, "max").optional(),
  seoDescription: z.string().trim().max(300, "max").optional(),
  coverImageAlt: z.string().trim().max(240, "max").optional(),
  coverImageCaption: z.string().trim().max(500, "max").optional(),
});

const formSchema = z.object({
  slug: z
    .string()
    .trim()
    .max(120, "max")
    .regex(/^[a-z0-9-]*$/, "pattern")
    .optional(),
  featured: z.boolean(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  tags: z.array(z.string().trim().min(1).max(80)).max(12),
  coverImageUrl: z
    .string()
    .trim()
    .max(500, "max")
    .refine((value) => value === "" || isSafePublicImageUrl(value), "url")
    .optional(),
  coverImageCredit: z.string().trim().max(200, "max").optional(),
  coverImageCreditUrl: z
    .string()
    .trim()
    .max(500, "max")
    .refine((value) => value === "" || isHttpUrl(value), "url")
    .optional(),
  translations: z.object({
    cs: translationSchema,
    en: translationSchema,
  }),
});

export type BlogFormValues = z.infer<typeof formSchema>;

type BlogFormProps = {
  mode: "create" | "edit";
  postId?: string;
  initialValues?: BlogFormValues;
  onCreated?: (id: string) => void;
};

const emptyTranslation = {
  title: "",
  excerpt: "",
  contentMarkdown: "",
  seoTitle: "",
  seoDescription: "",
  coverImageAlt: "",
  coverImageCaption: "",
};

const defaultValues: BlogFormValues = {
  slug: "",
  featured: false,
  status: "DRAFT",
  tags: [],
  coverImageUrl: "",
  coverImageCredit: "",
  coverImageCreditUrl: "",
  translations: {
    cs: emptyTranslation,
    en: emptyTranslation,
  },
};

const normalizeOptionalString = (value?: string | null) => {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
};

export default function BlogForm({
  mode,
  postId,
  initialValues,
  onCreated,
}: BlogFormProps) {
  const t = useTranslations("admin.blog");
  const utils = trpc.useUtils();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? defaultValues,
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;

  const watchedTags = useWatch({ control, name: "tags" });
  const coverImageUrl = useWatch({ control, name: "coverImageUrl" });

  const createMutation = trpc.admin.blog.create.useMutation({
    onSuccess: async (data) => {
      toast.success(t("toast.created"));
      await utils.admin.blog.list.invalidate();
      onCreated?.(data.id);
    },
    onError: () => toast.error(t("toast.error")),
  });

  const updateMutation = trpc.admin.blog.update.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.updated"));
      await utils.admin.blog.list.invalidate();
      if (postId) {
        await utils.admin.blog.getById.invalidate({ id: postId });
      }
    },
    onError: () => toast.error(t("toast.error")),
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const submitLabel = useMemo(
    () => (isSaving ? t("form.saving") : t("form.save")),
    [isSaving, t],
  );

  const toPayload = (values: BlogFormValues) => ({
    slug: normalizeOptionalString(values.slug) ?? undefined,
    featured: values.featured,
    status: values.status,
    tags: values.tags,
    coverImageUrl: normalizeOptionalString(values.coverImageUrl),
    coverImageCredit: normalizeOptionalString(values.coverImageCredit),
    coverImageCreditUrl: normalizeOptionalString(values.coverImageCreditUrl),
    translations: {
      cs: normalizeTranslationPayload(values.translations.cs),
      en: normalizeTranslationPayload(values.translations.en),
    },
  });

  const onSubmit = (values: BlogFormValues) => {
    const payload = toPayload(values);

    if (mode === "create") {
      createMutation.mutate(payload);
      return;
    }

    if (!postId) {
      toast.error(t("toast.error"));
      return;
    }

    updateMutation.mutate({
      id: postId,
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
            <label className="text-sm font-medium" htmlFor="slug">
              {t("form.slug.label")}
            </label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder={t("form.slug.placeholder")}
            />
            {errors.slug ? (
              <p className="text-xs text-destructive">
                {errors.slug.message === "pattern"
                  ? t("form.slug.errorPattern")
                  : t("form.slug.errorMax")}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
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
            <label className="flex items-center gap-3 pt-8 text-sm font-medium">
              <input
                type="checkbox"
                {...register("featured")}
                className="h-4 w-4 rounded border-border"
              />
              {t("form.featured.label")}
            </label>
          </div>

          <div className="space-y-2 md:col-span-2">
            <TagInput
              label={t("form.tags.label")}
              value={watchedTags}
              onChange={(value) =>
                setValue("tags", value, { shouldDirty: true, shouldValidate: true })
              }
              placeholder={t("form.tags.placeholder")}
              description={t("form.tags.helper")}
              removeLabel={t("form.removeTag")}
              maxItems={12}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium" htmlFor="coverImageUrl">
              {t("form.coverImageUrl.label")}
            </label>
            <Input
              id="coverImageUrl"
              {...register("coverImageUrl")}
              placeholder={t("form.coverImageUrl.placeholder")}
            />
            {postId ? (
              <BlobImageUploader
                projectId={postId}
                kind="blog-cover"
                buttonLabel={
                  coverImageUrl
                    ? t("form.coverImageUrl.replace")
                    : t("form.coverImageUrl.upload")
                }
                onUploaded={(urls) =>
                  setValue("coverImageUrl", urls[0] ?? "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            ) : (
              <p className="text-xs text-muted-foreground">
                {t("form.coverImageUrl.uploadUnavailable")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="coverImageCredit">
              {t("form.coverImageCredit.label")}
            </label>
            <Input
              id="coverImageCredit"
              {...register("coverImageCredit")}
              placeholder={t("form.coverImageCredit.placeholder")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="coverImageCreditUrl">
              {t("form.coverImageCreditUrl.label")}
            </label>
            <Input
              id="coverImageCreditUrl"
              {...register("coverImageCreditUrl")}
              placeholder={t("form.coverImageCreditUrl.placeholder")}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="cs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cs">{t("form.tabs.cs")}</TabsTrigger>
          <TabsTrigger value="en">{t("form.tabs.en")}</TabsTrigger>
        </TabsList>
        <TabsContent value="cs">
          <TranslationFields locale="cs" register={register} errors={errors} />
        </TabsContent>
        <TabsContent value="en">
          <TranslationFields locale="en" register={register} errors={errors} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

function normalizeTranslationPayload(
  value: BlogFormValues["translations"]["cs"],
) {
  return {
    title: value.title.trim(),
    excerpt: normalizeOptionalString(value.excerpt),
    contentMarkdown: value.contentMarkdown.trim(),
    seoTitle: normalizeOptionalString(value.seoTitle),
    seoDescription: normalizeOptionalString(value.seoDescription),
    coverImageAlt: normalizeOptionalString(value.coverImageAlt),
    coverImageCaption: normalizeOptionalString(value.coverImageCaption),
  };
}

function TranslationFields({
  locale,
  register,
  errors,
}: {
  locale: "cs" | "en";
  register: ReturnType<typeof useForm<BlogFormValues>>["register"];
  errors: ReturnType<typeof useForm<BlogFormValues>>["formState"]["errors"];
}) {
  const t = useTranslations("admin.blog");
  const fieldPrefix = `translations.${locale}` as const;
  const translationErrors = errors.translations?.[locale];

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6">
      <div className="grid gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor={`${fieldPrefix}.title`}>
            {t("form.title.label")}
          </label>
          <Input
            id={`${fieldPrefix}.title`}
            {...register(`${fieldPrefix}.title`)}
            placeholder={t("form.title.placeholder")}
          />
          {translationErrors?.title ? (
            <p className="text-xs text-destructive">
              {t("form.title.errorRequired")}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor={`${fieldPrefix}.excerpt`}>
            {t("form.excerpt.label")}
          </label>
          <Textarea
            id={`${fieldPrefix}.excerpt`}
            rows={3}
            {...register(`${fieldPrefix}.excerpt`)}
            placeholder={t("form.excerpt.placeholder")}
          />
          {translationErrors?.excerpt ? (
            <p className="text-xs text-destructive">
              {t("form.excerpt.errorMax")}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium"
            htmlFor={`${fieldPrefix}.contentMarkdown`}
          >
            {t("form.contentMarkdown.label")}
          </label>
          <Textarea
            id={`${fieldPrefix}.contentMarkdown`}
            rows={18}
            {...register(`${fieldPrefix}.contentMarkdown`)}
            placeholder={t("form.contentMarkdown.placeholder")}
            className="font-mono text-sm"
          />
          {translationErrors?.contentMarkdown ? (
            <p className="text-xs text-destructive">
              {translationErrors.contentMarkdown.message === "max"
                ? t("form.contentMarkdown.errorMax")
                : t("form.contentMarkdown.errorRequired")}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor={`${fieldPrefix}.coverImageAlt`}
            >
              {t("form.coverImageAlt.label")}
            </label>
            <Input
              id={`${fieldPrefix}.coverImageAlt`}
              {...register(`${fieldPrefix}.coverImageAlt`)}
              placeholder={t("form.coverImageAlt.placeholder")}
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor={`${fieldPrefix}.coverImageCaption`}
            >
              {t("form.coverImageCaption.label")}
            </label>
            <Input
              id={`${fieldPrefix}.coverImageCaption`}
              {...register(`${fieldPrefix}.coverImageCaption`)}
              placeholder={t("form.coverImageCaption.placeholder")}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor={`${fieldPrefix}.seoTitle`}
            >
              {t("form.seoTitle.label")}
            </label>
            <Input
              id={`${fieldPrefix}.seoTitle`}
              {...register(`${fieldPrefix}.seoTitle`)}
              placeholder={t("form.seoTitle.placeholder")}
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor={`${fieldPrefix}.seoDescription`}
            >
              {t("form.seoDescription.label")}
            </label>
            <Input
              id={`${fieldPrefix}.seoDescription`}
              {...register(`${fieldPrefix}.seoDescription`)}
              placeholder={t("form.seoDescription.placeholder")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
