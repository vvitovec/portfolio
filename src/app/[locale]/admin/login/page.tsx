import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { SignInButton } from "@/components/admin/AdminAuthButtons";
import Container from "@/components/layout/Container";
import { getServerAuthSession } from "@/server/auth";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminLoginPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const session = await getServerAuthSession();

  if (session?.user?.isAdmin) {
    redirect(`/${locale}/admin`);
  }

  const t = await getTranslations({ locale, namespace: "admin" });

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-xl space-y-6 rounded-2xl border border-border bg-card/80 p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("label")}
            </p>
            <h1 className="font-display text-3xl font-semibold text-foreground">
              {t("login.title")}
            </h1>
            <p className="text-muted-foreground">{t("login.subtitle")}</p>
          </div>
          <SignInButton
            label={t("login.button")}
            callbackUrl={`/${locale}/admin`}
          />
        </div>
      </Container>
    </section>
  );
}
