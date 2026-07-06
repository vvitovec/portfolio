"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { inferRouterOutputs } from "@trpc/server";
import { toast } from "sonner";

import BlogForm, { type BlogFormValues } from "@/components/admin/blog/BlogForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import type { AppRouter } from "@/server/trpc/routers/_app";
import { trpc } from "@/trpc/react";

type BlogOutput = inferRouterOutputs<AppRouter>["admin"]["blog"]["getById"];

const emptyTranslation = {
  title: "",
  excerpt: "",
  contentMarkdown: "",
  seoTitle: "",
  seoDescription: "",
  coverImageAlt: "",
  coverImageCaption: "",
};

function mapBlogToForm(post: BlogOutput): BlogFormValues {
  const translationByLocale = new Map(
    post.translations.map((translation) => [translation.locale, translation]),
  );
  const mapTranslation = (locale: "cs" | "en") => {
    const translation = translationByLocale.get(locale);
    if (!translation) return emptyTranslation;

    return {
      title: translation.title,
      excerpt: translation.excerpt ?? "",
      contentMarkdown: translation.contentMarkdown,
      seoTitle: translation.seoTitle ?? "",
      seoDescription: translation.seoDescription ?? "",
      coverImageAlt: translation.coverImageAlt ?? "",
      coverImageCaption: translation.coverImageCaption ?? "",
    };
  };

  return {
    slug: post.slug,
    featured: post.featured,
    status: post.status,
    tags: post.tags,
    coverImageUrl: post.coverImageUrl ?? "",
    coverImageCredit: post.coverImageCredit ?? "",
    coverImageCreditUrl: post.coverImageCreditUrl ?? "",
    translations: {
      cs: mapTranslation("cs"),
      en: mapTranslation("en"),
    },
  };
}

type BlogEditProps = {
  id: string;
};

export default function BlogEdit({ id }: BlogEditProps) {
  const t = useTranslations("admin.blog");
  const router = useRouter();
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.admin.blog.getById.useQuery({ id });

  const publishMutation = trpc.admin.blog.publish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.published"));
      await utils.admin.blog.getById.invalidate({ id });
      await utils.admin.blog.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const unpublishMutation = trpc.admin.blog.unpublish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.unpublished"));
      await utils.admin.blog.getById.invalidate({ id });
      await utils.admin.blog.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const deleteMutation = trpc.admin.blog.delete.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.deleted"));
      await utils.admin.blog.list.invalidate();
      router.push("/admin/blog");
    },
    onError: () => toast.error(t("toast.error")),
  });

  const initialValues = useMemo(
    () => (data ? mapBlogToForm(data) : undefined),
    [data],
  );

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">{t("loading")}</p>;
  }

  if (!data) {
    return <p className="text-sm text-muted-foreground">{t("notFound")}</p>;
  }

  const isPublished = data.status === "PUBLISHED";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Link
          href="/admin/blog"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("back")}
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="font-display text-3xl font-semibold text-foreground">
              {t("editTitle")}
            </h1>
            <p className="text-muted-foreground">{t("editSubtitle")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={isPublished ? "success" : "warning"}>
              {isPublished ? t("status.published") : t("status.draft")}
            </Badge>
            {isPublished ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => unpublishMutation.mutate({ id })}
                disabled={unpublishMutation.isPending}
              >
                {t("actions.unpublish")}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => publishMutation.mutate({ id })}
                disabled={publishMutation.isPending}
              >
                {t("actions.publish")}
              </Button>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href={`/blog/${data.slug}`}>{t("actions.preview")}</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/story/blog/${data.slug}`}>Story PNG</Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  {t("actions.delete")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("confirmDelete.title")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("confirmDelete.description")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("confirmDelete.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteMutation.mutate({ id })}>
                    {t("confirmDelete.confirm")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <BlogForm mode="edit" postId={id} initialValues={initialValues} />
    </div>
  );
}
