"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import type { inferRouterOutputs } from "@trpc/server";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { trpc } from "@/trpc/react";
import type { AppRouter } from "@/server/trpc/routers/_app";

type WebsitesList = inferRouterOutputs<AppRouter>["admin"]["websites"]["list"];
type WebsiteItem = WebsitesList[number];

export default function WebsiteList() {
  const t = useTranslations("admin.websites");
  const locale = useLocale();
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");

  const { data, isLoading } = trpc.admin.websites.list.useQuery();

  const publishMutation = trpc.admin.websites.publish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.published"));
      await utils.admin.websites.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const unpublishMutation = trpc.admin.websites.unpublish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.unpublished"));
      await utils.admin.websites.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const deleteMutation = trpc.admin.websites.delete.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.deleted"));
      await utils.admin.websites.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const rows = useMemo(() => {
    if (!data) return [];

    const query = search.trim().toLowerCase();
    if (!query) {
      return data;
    }

    return data.filter((website) =>
      [website.name, website.category, website.url]
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
        <Link href="/admin/websites/new" className={buttonVariants()}>
          {t("new")}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("searchPlaceholder")}
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">{t("loading")}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="rounded-2xl border border-border bg-card/80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("columns.name")}</TableHead>
                <TableHead>{t("columns.category")}</TableHead>
                <TableHead>{t("columns.status")}</TableHead>
                <TableHead>{t("columns.updatedAt")}</TableHead>
                <TableHead className="text-right">{t("columns.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((website) => (
                <WebsiteRow
                  key={website.id}
                  locale={locale}
                  t={t}
                  website={website}
                  onPublish={() => publishMutation.mutate({ id: website.id })}
                  onUnpublish={() => unpublishMutation.mutate({ id: website.id })}
                  onDelete={() => deleteMutation.mutate({ id: website.id })}
                  isPublishing={publishMutation.isPending}
                  isUnpublishing={unpublishMutation.isPending}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function WebsiteRow({
  locale,
  t,
  website,
  onPublish,
  onUnpublish,
  onDelete,
  isPublishing,
  isUnpublishing,
}: {
  locale: string;
  t: (key: string) => string;
  website: WebsiteItem;
  onPublish: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
  isPublishing: boolean;
  isUnpublishing: boolean;
}) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(new Date(website.updatedAt));
  const isPublished = website.status === "PUBLISHED";

  return (
    <TableRow>
      <TableCell>
        <div className="space-y-1">
          <p className="font-medium text-foreground">{website.name}</p>
          <p className="max-w-[28rem] truncate text-xs text-muted-foreground">
            {website.url}
          </p>
        </div>
      </TableCell>
      <TableCell>{website.category}</TableCell>
      <TableCell>
        <Badge variant={isPublished ? "success" : "warning"}>
          {isPublished ? t("status.published") : t("status.draft")}
        </Badge>
      </TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell className="text-right">
        <div className="flex flex-wrap justify-end gap-2">
          <Link
            href={`/admin/websites/${website.id}`}
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
            <Button variant="outline" size="sm" onClick={onPublish} disabled={isPublishing}>
              {t("actions.publish")}
            </Button>
          )}
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
