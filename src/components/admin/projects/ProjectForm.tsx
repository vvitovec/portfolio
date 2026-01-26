"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import BlobImageUploader from "@/components/admin/BlobImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import TagInput from "@/components/admin/projects/TagInput";
import { slugify } from "@/lib/slugify";
import { trpc } from "@/trpc/react";

const MAX_TECH_STACK = 12;
const MAX_HIGHLIGHTS = 8;

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === "" || isValidUrl(value), {
    message: "url",
  });

const urlSchema = z
  .string()
  .trim()
  .max(500)
  .refine((value) => isValidUrl(value), {
    message: "url",
  });

const translationSchema = z.object({
  title: z.string().trim().min(1, "required").max(160, "max"),
  tagline: z.string().trim().max(200, "max").optional(),
  descriptionShort: z.string().trim().max(400, "max").optional(),
  descriptionLong: z.string().trim().max(5000, "max").optional(),
  role: z.string().trim().max(200, "max").optional(),
  highlights: z.array(z.string().trim().min(1).max(200)).max(MAX_HIGHLIGHTS),
});

const formSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "required")
    .max(120, "max")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "pattern"),
  featured: z.boolean(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  coverImageUrl: optionalUrl,
  galleryImageUrls: z.array(urlSchema),
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  techStack: z.array(z.string().trim().min(1).max(100)).max(MAX_TECH_STACK),
  translations: z.object({
    cs: translationSchema,
    en: translationSchema,
  }),
});

type ProjectFormValues = z.infer<typeof formSchema>;

type ProjectFormProps = {
  mode: "create" | "edit";
  projectId?: string;
  initialValues?: ProjectFormValues;
  onCreated?: (id: string) => void;
};

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const emptyTranslations = {
  title: "",
  tagline: "",
  descriptionShort: "",
  descriptionLong: "",
  role: "",
  highlights: [],
};

const defaultValues: ProjectFormValues = {
  slug: "",
  featured: false,
  status: "DRAFT",
  coverImageUrl: "",
  galleryImageUrls: [],
  liveUrl: "",
  repoUrl: "",
  techStack: [],
  translations: {
    cs: { ...emptyTranslations },
    en: { ...emptyTranslations },
  },
};

const normalizeOptionalString = (value: string) => {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export default function ProjectForm({
  mode,
  projectId,
  initialValues,
  onCreated,
}: ProjectFormProps) {
  const t = useTranslations("admin.projects");
  const utils = trpc.useUtils();
  const [slugTouched, setSlugTouched] = useState(
    Boolean(initialValues?.slug),
  );
  const mediaEnabled = mode === "edit" && Boolean(projectId);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? defaultValues,
  });

  const { control, register, setValue, handleSubmit, formState } = form;
  const errors = formState.errors;

  const csTitle = useWatch({
    control,
    name: "translations.cs.title",
  });
  const slugField = register("slug");

  useEffect(() => {
    if (!slugTouched && csTitle) {
      const nextSlug = slugify(csTitle);
      if (nextSlug) {
        setValue("slug", nextSlug, { shouldValidate: true });
      }
    }
  }, [csTitle, slugTouched, setValue]);

  const createMutation = trpc.admin.projects.create.useMutation({
    onSuccess: async (data) => {
      toast.success(t("toast.created"));
      await utils.admin.projects.list.invalidate();
      onCreated?.(data.id);
    },
    onError: () => toast.error(t("toast.error")),
  });

  const updateMutation = trpc.admin.projects.update.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.updated"));
      await utils.admin.projects.list.invalidate();
      if (projectId) {
        await utils.admin.projects.getById.invalidate({ id: projectId });
      }
    },
    onError: () => toast.error(t("toast.error")),
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const submitLabel = useMemo(
    () => (isSaving ? t("form.saving") : t("form.save")),
    [isSaving, t],
  );

  const onSubmit = (values: ProjectFormValues) => {
    const payload = {
      slug: values.slug,
      featured: values.featured,
      status: values.status,
      coverImageUrl: normalizeOptionalString(values.coverImageUrl),
      galleryImageUrls: values.galleryImageUrls,
      liveUrl: normalizeOptionalString(values.liveUrl),
      repoUrl: normalizeOptionalString(values.repoUrl),
      techStack: values.techStack,
      translations: {
        cs: {
          ...values.translations.cs,
          tagline: normalizeOptionalString(values.translations.cs.tagline ?? ""),
          descriptionShort: normalizeOptionalString(
            values.translations.cs.descriptionShort ?? "",
          ),
          descriptionLong: normalizeOptionalString(
            values.translations.cs.descriptionLong ?? "",
          ),
          role: normalizeOptionalString(values.translations.cs.role ?? ""),
        },
        en: {
          ...values.translations.en,
          tagline: normalizeOptionalString(values.translations.en.tagline ?? ""),
          descriptionShort: normalizeOptionalString(
            values.translations.en.descriptionShort ?? "",
          ),
          descriptionLong: normalizeOptionalString(
            values.translations.en.descriptionLong ?? "",
          ),
          role: normalizeOptionalString(values.translations.en.role ?? ""),
        },
      },
    };

    if (mode === "create") {
      createMutation.mutate(payload);
      return;
    }

    if (!projectId) {
      toast.error(t("toast.error"));
      return;
    }

    updateMutation.mutate({ id: projectId, ...payload });
  };

  const coverField = (
    <Controller
      control={control}
      name="coverImageUrl"
      render={({ field }) => {
        if (!mediaEnabled) return <span className="hidden" />;
        const hasCover = Boolean(field.value);

        return (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {t("media.cover.title")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("media.cover.helper")}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <BlobImageUploader
                  projectId={projectId ?? ""}
                  kind="cover"
                  buttonLabel={
                    hasCover
                      ? t("media.cover.replace")
                      : t("media.cover.upload")
                  }
                  onUploaded={(urls) => {
                    field.onChange(urls[0] ?? "");
                  }}
                />
                {hasCover ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => field.onChange("")}
                  >
                    {t("media.cover.remove")}
                  </Button>
                ) : null}
              </div>
            </div>
            {hasCover ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={field.value}
                  alt={t("media.cover.alt")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex min-h-[140px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
                {t("media.cover.empty")}
              </div>
            )}
          </div>
        );
      }}
    />
  );

  const galleryField = (
    <Controller
      control={control}
      name="galleryImageUrls"
      render={({ field }) => {
        if (!mediaEnabled) return <span className="hidden" />;
        const galleryImages = field.value ?? [];

        return (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {t("media.gallery.title")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("media.gallery.helper")}
                </p>
              </div>
              <BlobImageUploader
                projectId={projectId ?? ""}
                kind="gallery"
                multiple
                buttonLabel={t("media.gallery.upload")}
                onUploaded={(urls) => {
                  field.onChange([...galleryImages, ...urls]);
                }}
              />
            </div>
            {galleryImages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t("media.gallery.empty")}
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((url) => (
                  <div
                    key={url}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted"
                  >
                    <Image
                      src={url}
                      alt={t("media.gallery.alt")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity motion-safe:duration-200 motion-safe:transition-opacity motion-reduce:transition-none group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() =>
                          field.onChange(
                            galleryImages.filter((item) => item !== url),
                          )
                        }
                      >
                        {t("media.gallery.remove")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)]">
        <div className="space-y-4 rounded-2xl border border-border bg-card/80 p-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {t("form.baseTitle")}
          </h2>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="slug">
              {t("form.slug.label")}
            </label>
            <Input
              id="slug"
              {...slugField}
              onChange={(event) => {
                setSlugTouched(true);
                slugField.onChange(event);
              }}
              placeholder={t("form.slug.placeholder")}
            />
            {errors.slug ? (
              <p className="text-xs text-destructive">
                {errors.slug.message === "pattern"
                  ? t("form.slug.errorPattern")
                  : errors.slug.message === "max"
                    ? t("form.slug.errorMax")
                    : t("form.slug.errorRequired")}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="featured">
              {t("form.featured.label")}
            </label>
            <Controller
              control={control}
              name="featured"
              render={({ field }) => (
                <Switch
                  id="featured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
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
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="liveUrl">
              {t("form.liveUrl.label")}
            </label>
            <Input
              id="liveUrl"
              {...register("liveUrl")}
              placeholder={t("form.liveUrl.placeholder")}
            />
            {errors.liveUrl ? (
              <p className="text-xs text-destructive">
                {t("form.urlError")}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="repoUrl">
              {t("form.repoUrl.label")}
            </label>
            <Input
              id="repoUrl"
              {...register("repoUrl")}
              placeholder={t("form.repoUrl.placeholder")}
            />
            {errors.repoUrl ? (
              <p className="text-xs text-destructive">
                {t("form.urlError")}
              </p>
            ) : null}
          </div>
          <Controller
            control={control}
            name="techStack"
            render={({ field }) => (
              <TagInput
                label={t("form.techStack.label")}
                value={field.value}
                onChange={field.onChange}
                placeholder={t("form.techStack.placeholder")}
                maxItems={MAX_TECH_STACK}
                description={t("form.techStack.helper")}
                removeLabel={t("form.removeTag")}
              />
            )}
          />
          {errors.techStack ? (
            <p className="text-xs text-destructive">
              {t("form.techStack.error")}
            </p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-6">
          <Tabs defaultValue="cs">
            <TabsList>
              <TabsTrigger value="cs">{t("form.tabs.cs")}</TabsTrigger>
              <TabsTrigger value="en">{t("form.tabs.en")}</TabsTrigger>
            </TabsList>
            <TabsContent value="cs">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="cs-title">
                    {t("form.title.label")}
                  </label>
                  <Input
                    id="cs-title"
                    {...register("translations.cs.title")}
                    placeholder={t("form.title.placeholder")}
                  />
                  {errors.translations?.cs?.title ? (
                    <p className="text-xs text-destructive">
                      {t("form.title.errorRequired")}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="cs-tagline">
                    {t("form.tagline.label")}
                  </label>
                  <Input
                    id="cs-tagline"
                    {...register("translations.cs.tagline")}
                    placeholder={t("form.tagline.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="cs-descriptionShort"
                  >
                    {t("form.descriptionShort.label")}
                  </label>
                  <Textarea
                    id="cs-descriptionShort"
                    {...register("translations.cs.descriptionShort")}
                    placeholder={t("form.descriptionShort.placeholder")}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="cs-descriptionLong"
                  >
                    {t("form.descriptionLong.label")}
                  </label>
                  <Textarea
                    id="cs-descriptionLong"
                    {...register("translations.cs.descriptionLong")}
                    placeholder={t("form.descriptionLong.placeholder")}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="cs-role">
                    {t("form.role.label")}
                  </label>
                  <Input
                    id="cs-role"
                    {...register("translations.cs.role")}
                    placeholder={t("form.role.placeholder")}
                  />
                </div>
                <Controller
                  control={control}
                  name="translations.cs.highlights"
                  render={({ field }) => (
                    <TagInput
                      label={t("form.highlights.label")}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("form.highlights.placeholder")}
                      maxItems={MAX_HIGHLIGHTS}
                      removeLabel={t("form.removeTag")}
                    />
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value="en">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="en-title">
                    {t("form.title.label")}
                  </label>
                  <Input
                    id="en-title"
                    {...register("translations.en.title")}
                    placeholder={t("form.title.placeholder")}
                  />
                  {errors.translations?.en?.title ? (
                    <p className="text-xs text-destructive">
                      {t("form.title.errorRequired")}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="en-tagline">
                    {t("form.tagline.label")}
                  </label>
                  <Input
                    id="en-tagline"
                    {...register("translations.en.tagline")}
                    placeholder={t("form.tagline.placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="en-descriptionShort"
                  >
                    {t("form.descriptionShort.label")}
                  </label>
                  <Textarea
                    id="en-descriptionShort"
                    {...register("translations.en.descriptionShort")}
                    placeholder={t("form.descriptionShort.placeholder")}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    htmlFor="en-descriptionLong"
                  >
                    {t("form.descriptionLong.label")}
                  </label>
                  <Textarea
                    id="en-descriptionLong"
                    {...register("translations.en.descriptionLong")}
                    placeholder={t("form.descriptionLong.placeholder")}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="en-role">
                    {t("form.role.label")}
                  </label>
                  <Input
                    id="en-role"
                    {...register("translations.en.role")}
                    placeholder={t("form.role.placeholder")}
                  />
                </div>
                <Controller
                  control={control}
                  name="translations.en.highlights"
                  render={({ field }) => (
                    <TagInput
                      label={t("form.highlights.label")}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("form.highlights.placeholder")}
                      maxItems={MAX_HIGHLIGHTS}
                      removeLabel={t("form.removeTag")}
                    />
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {mediaEnabled ? (
        <div className="space-y-6 rounded-2xl border border-border bg-card/80 p-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {t("media.title")}
          </h2>
          {coverField}
          {galleryField}
        </div>
      ) : (
        <>
          {coverField}
          {galleryField}
        </>
      )}
      <div className="flex items-center justify-end gap-3">
        <Button type="submit" disabled={isSaving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
