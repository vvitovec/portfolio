import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import WebsitesShowcase from "@/components/websites/WebsitesShowcase";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

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

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>
        <WebsitesShowcase />
      </Container>
    </section>
  );
}
