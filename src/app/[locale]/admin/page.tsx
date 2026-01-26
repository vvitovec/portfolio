import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { SignOutButton } from "@/components/admin/AdminAuthButtons";
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
        <div className="max-w-3xl space-y-6 rounded-2xl border border-border bg-card/80 p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("label")}
            </p>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              {t("dashboard.title")}
            </h1>
            <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
          </div>
          <SignOutButton label={t("dashboard.signOut")} />
        </div>
      </Container>
    </section>
  );
}
