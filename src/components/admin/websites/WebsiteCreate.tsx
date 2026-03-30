"use client";

import { useTranslations } from "next-intl";

import WebsiteForm from "@/components/admin/websites/WebsiteForm";
import { Link, useRouter } from "@/i18n/navigation";

export default function WebsiteCreate() {
  const t = useTranslations("admin.websites");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Link
          href="/admin/websites"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("back")}
        </Link>
        <h1 className="font-display text-3xl font-semibold text-foreground">
          {t("createTitle")}
        </h1>
        <p className="text-muted-foreground">{t("createSubtitle")}</p>
      </div>
      <WebsiteForm
        mode="create"
        onCreated={(id) => router.push(`/admin/websites/${id}`)}
      />
    </div>
  );
}
