import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FolderKanban, Globe } from "lucide-react";

import { SignOutButton } from "@/components/admin/AdminAuthButtons";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";
import { getServerAuthSession } from "@/server/auth";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const session = await getServerAuthSession();

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  if (!session.user?.isAdmin) {
    redirect(`/${locale}/admin/forbidden`);
  }

  const t = await getTranslations({ locale, namespace: "admin" });

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-4xl space-y-6 rounded-2xl border border-border bg-card/80 p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("label")}
            </p>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              {t("dashboard.title")}
            </h1>
            <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/admin/projects"
              className="rounded-2xl border border-border/60 bg-background/70 p-6 transition-colors hover:border-foreground/20 hover:bg-muted/30"
            >
              <div className="mb-4 inline-flex rounded-full border border-border/60 p-3 text-foreground">
                <FolderKanban className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {t("dashboard.sections.projects.title")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("dashboard.sections.projects.description")}
              </p>
            </Link>
            <Link
              href="/admin/websites"
              className="rounded-2xl border border-border/60 bg-background/70 p-6 transition-colors hover:border-foreground/20 hover:bg-muted/30"
            >
              <div className="mb-4 inline-flex rounded-full border border-border/60 p-3 text-foreground">
                <Globe className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {t("dashboard.sections.websites.title")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("dashboard.sections.websites.description")}
              </p>
            </Link>
          </div>
          <SignOutButton label={t("dashboard.signOut")} />
        </div>
      </Container>
    </section>
  );
}
