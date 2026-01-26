"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import type { inferRouterOutputs } from "@trpc/server";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

type ProjectsList = inferRouterOutputs<AppRouter>["admin"]["projects"]["list"];
type ProjectItem = ProjectsList[number];

function getTranslation(project: ProjectItem, locale: "cs" | "en") {
  return project.translations.find((item) => item.locale === locale);
}

export default function ProjectList() {
  const t = useTranslations("admin.projects");
  const locale = useLocale();
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");

  const { data, isLoading } = trpc.admin.projects.list.useQuery();

  const publishMutation = trpc.admin.projects.publish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.published"));
      await utils.admin.projects.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const unpublishMutation = trpc.admin.projects.unpublish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.unpublished"));
      await utils.admin.projects.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const deleteMutation = trpc.admin.projects.delete.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.deleted"));
      await utils.admin.projects.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const rows = useMemo(() => {
    if (!data) return [];

    const query = search.trim().toLowerCase();
    const filtered = query
      ? data.filter((project) => {
          const csTitle = getTranslation(project, "cs")?.title ?? project.slug;
          return (
            csTitle.toLowerCase().includes(query) ||
            project.slug.toLowerCase().includes(query)
          );
        })
      : data;

    return filtered;
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
        <Link href="/admin/projects/new" className={buttonVariants()}>
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
                <TableHead>{t("columns.title")}</TableHead>
                <TableHead>{t("columns.status")}</TableHead>
                <TableHead>{t("columns.featured")}</TableHead>
                <TableHead>{t("columns.updatedAt")}</TableHead>
                <TableHead className="text-right">{t("columns.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((project) => {
                const csTitle =
                  getTranslation(project, "cs")?.title ?? project.slug;
                const formattedDate = new Intl.DateTimeFormat(locale, {
                  dateStyle: "medium",
                }).format(new Date(project.updatedAt));

                const isPublished = project.status === "PUBLISHED";

                return (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{csTitle}</TableCell>
                    <TableCell>
                      <Badge
                        variant={isPublished ? "success" : "warning"}
                      >
                        {isPublished
                          ? t("status.published")
                          : t("status.draft")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {project.featured
                        ? t("featured.yes")
                        : t("featured.no")}
                    </TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          {t("actions.edit")}
                        </Link>
                        {isPublished ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              unpublishMutation.mutate({ id: project.id })
                            }
                            disabled={unpublishMutation.isPending}
                          >
                            {t("actions.unpublish")}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              publishMutation.mutate({ id: project.id })
                            }
                            disabled={publishMutation.isPending}
                          >
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
                              <AlertDialogTitle>
                                {t("confirmDelete.title")}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t("confirmDelete.description")}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {t("confirmDelete.cancel")}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  deleteMutation.mutate({ id: project.id })
                                }
                              >
                                {t("confirmDelete.confirm")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
