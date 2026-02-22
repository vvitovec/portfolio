import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import JsonLd from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { getBlurDataURL } from "@/lib/image-placeholder";
import { buildPageMetadata } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/structured-data";
import { getPublishedProjects } from "@/server/queries/projects";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

const projectsMetadataByLocale: Record<Locale, { title: string; description: string }> =
  {
    cs: {
      title: "Projekty | Viktor Vítovec",
      description:
        "Výběr realizovaných projektů od Viktora Vítovce. Weby a digitální produkty se zaměřením na výkon, UX a byznysový dopad.",
    },
    en: {
      title: "Projects | Viktor Vítovec",
      description:
        "Selected projects by Viktor Vítovec, focused on web performance, UX quality, and measurable outcomes.",
    },
  };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const meta = projectsMetadataByLocale[locale];

  return buildPageMetadata({
    locale,
    pathname: "/projects",
    title: meta.title,
    description: meta.description,
    type: "website",
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "projects" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const projects = await getPublishedProjects(locale);
  const blurDataURL = getBlurDataURL(720, 450);
  const meta = projectsMetadataByLocale[locale];
  const breadcrumb = createBreadcrumbSchema(locale, [
    { name: nav("home"), pathname: "/" },
    { name: t("title"), pathname: "/projects" },
  ]);

  return (
    <>
      <JsonLd
        id={`projects-structured-data-${locale}`}
        data={[
          createWebPageSchema({
            locale,
            pathname: "/projects",
            title: meta.title,
            description: meta.description,
          }),
          breadcrumb,
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
          <ProjectsExplorer projects={projects} blurDataURL={blurDataURL} />
        </Container>
      </section>
    </>
  );
}
