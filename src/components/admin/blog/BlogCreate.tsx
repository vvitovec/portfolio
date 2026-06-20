"use client";

import { useTranslations } from "next-intl";

import BlogForm from "@/components/admin/blog/BlogForm";
import { Link, useRouter } from "@/i18n/navigation";

export default function BlogCreate() {
  const t = useTranslations("admin.blog");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Link
          href="/admin/blog"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("back")}
        </Link>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          {t("createTitle")}
        </h1>
        <p className="text-muted-foreground">{t("createSubtitle")}</p>
      </div>
      <BlogForm mode="create" onCreated={(id) => router.push(`/admin/blog/${id}`)} />
    </div>
  );
}
