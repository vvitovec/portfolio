import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import WebsitesShowcase from "@/components/websites/WebsitesShowcase";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { getPublishedWebsites } from "@/server/queries/websites";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  cs: {
    title: "Weby | Viktor Vítovec",
    description:
      "Interaktivní přehled webových stránek pro restaurace, kavárny, firmy a podnikatele.",
  },
  en: {
    title: "Websites | Viktor Vítovec",
    description:
      "Interactive showcase of websites I've built for restaurants, cafes, companies, and entrepreneurs.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  return buildPageMetadata({
    locale,
    pathname: "/websites",
    title: metaByLocale[locale].title,
    description: metaByLocale[locale].description,
    type: "website",
  });
}

export default async function WebsitesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const t = await getTranslations({ locale, namespace: "websites" });
  const websites = await getPublishedWebsites(locale);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-mesh-warm" />
      <Container className="relative">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent-gold" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
              {t("title")}
            </p>
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
        <WebsitesShowcase websites={websites} />
      </Container>
    </section>
  );
}
