"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { inferRouterOutputs } from "@trpc/server";
import { toast } from "sonner";

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
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import type { AppRouter } from "@/server/trpc/routers/_app";
import { trpc } from "@/trpc/react";

type BlogListOutput = inferRouterOutputs<AppRouter>["admin"]["blog"]["list"];
type BlogItem = BlogListOutput[number];

const getTitle = (post: BlogItem) =>
  post.translations.find((translation) => translation.locale === "cs")?.title ??
  post.translations[0]?.title ??
  post.slug;

export default function BlogList() {
  const t = useTranslations("admin.blog");
  const locale = useLocale();
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");

  const { data, isLoading } = trpc.admin.blog.list.useQuery();

  const publishMutation = trpc.admin.blog.publish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.published"));
      await utils.admin.blog.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const unpublishMutation = trpc.admin.blog.unpublish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.unpublished"));
      await utils.admin.blog.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const deleteMutation = trpc.admin.blog.delete.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.deleted"));
      await utils.admin.blog.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const sendNewsletterMutation = trpc.admin.newsletter.sendPost.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.newsletterSent"));
      await utils.admin.blog.list.invalidate();
      await utils.admin.newsletter.summary.invalidate();
      await utils.admin.newsletter.sends.invalidate();
      await utils.admin.newsletter.events.invalidate();
    },
    onError: (error) => toast.error(error.message || t("toast.error")),
  });

  const rows = useMemo(() => {
    if (!data) return [];

    const query = search.trim().toLowerCase();
    if (!query) return data;

    return data.filter((post) =>
      [getTitle(post), post.slug, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Link href="/admin/blog/new" className={buttonVariants()}>
          {t("new")}
        </Link>
      </div>

      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={t("searchPlaceholder")}
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">{t("loading")}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="rounded-2xl border border-border bg-card/80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("columns.title")}</TableHead>
                <TableHead>{t("columns.status")}</TableHead>
                <TableHead>{t("columns.featured")}</TableHead>
                <TableHead>{t("columns.updatedAt")}</TableHead>
                <TableHead className="text-right">{t("columns.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((post) => (
                <BlogRow
                  key={post.id}
                  locale={locale}
                  t={t}
                  post={post}
                  onPublish={() => publishMutation.mutate({ id: post.id })}
                  onUnpublish={() => unpublishMutation.mutate({ id: post.id })}
                  onDelete={() => deleteMutation.mutate({ id: post.id })}
                  onSendNewsletter={() =>
                    sendNewsletterMutation.mutate({ postId: post.id })
                  }
                  isPublishing={publishMutation.isPending}
                  isUnpublishing={unpublishMutation.isPending}
                  isSendingNewsletter={sendNewsletterMutation.isPending}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function BlogRow({
  locale,
  t,
  post,
  onPublish,
  onUnpublish,
  onDelete,
  onSendNewsletter,
  isPublishing,
  isUnpublishing,
  isSendingNewsletter,
}: {
  locale: string;
  t: (key: string) => string;
  post: BlogItem;
  onPublish: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
  onSendNewsletter: () => void;
  isPublishing: boolean;
  isUnpublishing: boolean;
  isSendingNewsletter: boolean;
}) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(new Date(post.updatedAt));
  const isPublished = post.status === "PUBLISHED";
  const wasSentToNewsletter = post.newsletterSends.length > 0;

  return (
    <TableRow>
      <TableCell>
        <div className="space-y-1">
          <p className="font-medium text-foreground">{getTitle(post)}</p>
          <p className="max-w-[28rem] truncate text-xs text-muted-foreground">
            /blog/{post.slug}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={isPublished ? "success" : "warning"}>
          {isPublished ? t("status.published") : t("status.draft")}
        </Badge>
      </TableCell>
      <TableCell>{post.featured ? t("featured.yes") : t("featured.no")}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell className="text-right">
        <div className="flex flex-wrap justify-end gap-2">
          <Link
            href={`/admin/blog/${post.id}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {t("actions.edit")}
          </Link>
          {isPublished ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onUnpublish}
              disabled={isUnpublishing}
            >
              {t("actions.unpublish")}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onPublish}
              disabled={isPublishing}
            >
              {t("actions.publish")}
            </Button>
          )}
          {isPublished ? (
            wasSentToNewsletter ? (
              <Button variant="ghost" size="sm" disabled>
                {t("actions.newsletterSent")}
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isSendingNewsletter}
                  >
                    {t("actions.sendNewsletter")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("confirmNewsletter.title")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("confirmNewsletter.description")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {t("confirmNewsletter.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onSendNewsletter}>
                      {t("confirmNewsletter.confirm")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )
          ) : null}
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
                <AlertDialogAction onClick={onDelete}>
                  {t("confirmDelete.confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
