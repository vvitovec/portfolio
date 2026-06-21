import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import JsonLd from "@/components/seo/JsonLd";
import WebsitesShowcase from "@/components/websites/WebsitesShowcase";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  createItemListSchema,
  createWebPageSchema,
} from "@/lib/structured-data";
import { getPublishedWebsites } from "@/server/queries/websites";

export const revalidate = 300;

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
    <>
      <JsonLd
        id={`websites-structured-data-${locale}`}
        data={[
          createWebPageSchema({
            locale,
            pathname: "/websites",
            title: metaByLocale[locale].title,
            description: metaByLocale[locale].description,
          }),
          createItemListSchema(
            locale,
            "/websites",
            t("title"),
            websites.map((website) => ({
              name: website.name,
              pathname: "/websites",
              description: website.description,
            })),
          ),
        ]}
      />
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
          <WebsitesShowcase websites={websites} />
        </Container>
      </section>
    </>
  );
}
