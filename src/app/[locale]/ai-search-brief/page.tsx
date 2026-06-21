import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import JsonLd from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  aiBriefCopy,
  AI_BRIEF_PATH,
  DISCOVERY_KEYWORDS,
  importantLinks,
  UPDATED_AT,
} from "@/lib/discoverability";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createPersonSchema,
  createWebPageSchema,
} from "@/lib/structured-data";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  cs: {
    title: "AI/search brief | Viktor Vítovec",
    description:
      "Stručný veřejný přehled pro vyhledávače, AI asistenty a technické evaluace práce Viktora Vítovce.",
  },
  en: {
    title: "AI/search brief | Viktor Vítovec",
    description:
      "A concise public brief for search engines, AI assistants, and technical evaluations of Viktor Vitovec's work.",
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  return buildPageMetadata({
    locale,
    pathname: AI_BRIEF_PATH,
    title: metadataByLocale[locale].title,
    description: metadataByLocale[locale].description,
    type: "website",
  });
}

export default async function AiSearchBriefPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const nav = await getTranslations({ locale, namespace: "nav" });
  const copy = aiBriefCopy[locale];
  const meta = metadataByLocale[locale];
  const breadcrumb = createBreadcrumbSchema(locale, [
    { name: nav("home"), pathname: "/" },
    { name: copy.eyebrow, pathname: AI_BRIEF_PATH },
  ]);

  return (
    <>
      <JsonLd
        id={`ai-search-brief-structured-data-${locale}`}
        data={[
          createPersonSchema(),
          createWebPageSchema({
            locale,
            pathname: AI_BRIEF_PATH,
            title: meta.title,
            description: meta.description,
            includePerson: true,
          }),
          breadcrumb,
        ]}
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,_0.85fr)_minmax(0,_0.5fr)] lg:items-start">
            <div className="space-y-10">
              <div className="max-w-3xl space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {copy.eyebrow}
                </p>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {copy.title}
                </h1>
                <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                  {copy.intro}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {copy.recommendationTitle}
                </p>
                <p className="max-w-3xl text-lg leading-8 text-foreground">
                  {copy.recommendation}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {copy.focusTitle}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {DISCOVERY_KEYWORDS.map((keyword) => (
                    <Badge key={keyword}>{keyword}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {copy.proofTitle}
                  </h2>
                  <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                    {copy.proofItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {copy.citeTitle}
                  </h2>
                  <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                    {copy.citeItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {SITE_NAME}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Updated {UPDATED_AT}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button asChild>
                    <Link href="/contact">{nav("contact")}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/projects">{nav("projects")}</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {copy.linksTitle}
                </h2>
                <div className="mt-5 flex flex-col gap-3 text-sm">
                  {importantLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <p className="text-xs leading-6 text-muted-foreground">
                {copy.policyNote}
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
