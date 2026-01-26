import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminForbiddenPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

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
              {t("forbidden.title")}
            </h1>
            <p className="text-muted-foreground">{t("forbidden.subtitle")}</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-muted motion-safe:duration-200 motion-safe:transition motion-reduce:transition-none"
          >
            {t("forbidden.action")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
