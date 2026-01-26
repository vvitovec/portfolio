"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { inferRouterOutputs } from "@trpc/server";

import ProjectForm from "@/components/admin/projects/ProjectForm";
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
import { trpc } from "@/trpc/react";
import type { AppRouter } from "@/server/trpc/routers/_app";

type ProjectOutput = inferRouterOutputs<AppRouter>["admin"]["projects"]["getById"];

const emptyTranslation = {
  title: "",
  tagline: "",
  descriptionShort: "",
  descriptionLong: "",
  role: "",
  highlights: [],
};

function mapProjectToForm(project: ProjectOutput) {
  const getTranslation = (locale: "cs" | "en") =>
    project.translations.find((item) => item.locale === locale);

  const cs = getTranslation("cs");
  const en = getTranslation("en");

  return {
    slug: project.slug,
    featured: project.featured,
    status: project.status,
    coverImageUrl: project.coverImageUrl ?? "",
    galleryImageUrls: project.galleryImageUrls ?? [],
    liveUrl: project.liveUrl ?? "",
    repoUrl: project.repoUrl ?? "",
    techStack: project.techStack ?? [],
    translations: {
      cs: {
        ...emptyTranslation,
        title: cs?.title ?? "",
        tagline: cs?.tagline ?? "",
        descriptionShort: cs?.descriptionShort ?? "",
        descriptionLong: cs?.descriptionLong ?? "",
        role: cs?.role ?? "",
        highlights: cs?.highlights ?? [],
      },
      en: {
        ...emptyTranslation,
        title: en?.title ?? "",
        tagline: en?.tagline ?? "",
        descriptionShort: en?.descriptionShort ?? "",
        descriptionLong: en?.descriptionLong ?? "",
        role: en?.role ?? "",
        highlights: en?.highlights ?? [],
      },
    },
  };
}

type ProjectEditProps = {
  id: string;
};

export default function ProjectEdit({ id }: ProjectEditProps) {
  const t = useTranslations("admin.projects");
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.admin.projects.getById.useQuery({ id });

  const publishMutation = trpc.admin.projects.publish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.published"));
      await utils.admin.projects.getById.invalidate({ id });
      await utils.admin.projects.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const unpublishMutation = trpc.admin.projects.unpublish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.unpublished"));
      await utils.admin.projects.getById.invalidate({ id });
      await utils.admin.projects.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const deleteMutation = trpc.admin.projects.delete.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.deleted"));
      await utils.admin.projects.list.invalidate();
      router.push("/admin/projects");
    },
    onError: () => toast.error(t("toast.error")),
  });

  const initialValues = useMemo(
    () => (data ? mapProjectToForm(data) : undefined),
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
          href="/admin/projects"
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
                  <AlertDialogAction onClick={() => deleteMutation.mutate({ id })}>
                    {t("confirmDelete.confirm")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <ProjectForm
        mode="edit"
        projectId={id}
        initialValues={initialValues}
      />
    </div>
  );
}
