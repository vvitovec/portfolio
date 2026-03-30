"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { inferRouterOutputs } from "@trpc/server";

import WebsiteForm from "@/components/admin/websites/WebsiteForm";
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

type WebsiteOutput = inferRouterOutputs<AppRouter>["admin"]["websites"]["getById"];

function mapWebsiteToForm(website: WebsiteOutput) {
  return {
    name: website.name,
    url: website.url,
    category: website.category,
    description: website.description ?? "",
    sortOrder: website.sortOrder,
    status: website.status,
  };
}

type WebsiteEditProps = {
  id: string;
};

export default function WebsiteEdit({ id }: WebsiteEditProps) {
  const t = useTranslations("admin.websites");
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.admin.websites.getById.useQuery({ id });

  const publishMutation = trpc.admin.websites.publish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.published"));
      await utils.admin.websites.getById.invalidate({ id });
      await utils.admin.websites.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const unpublishMutation = trpc.admin.websites.unpublish.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.unpublished"));
      await utils.admin.websites.getById.invalidate({ id });
      await utils.admin.websites.list.invalidate();
    },
    onError: () => toast.error(t("toast.error")),
  });

  const deleteMutation = trpc.admin.websites.delete.useMutation({
    onSuccess: async () => {
      toast.success(t("toast.deleted"));
      await utils.admin.websites.list.invalidate();
      router.push("/admin/websites");
    },
    onError: () => toast.error(t("toast.error")),
  });

  const initialValues = useMemo(
    () => (data ? mapWebsiteToForm(data) : undefined),
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
          href="/admin/websites"
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

      <WebsiteForm mode="edit" websiteId={id} initialValues={initialValues} />
    </div>
  );
}
