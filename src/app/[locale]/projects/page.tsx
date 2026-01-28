import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { routing, type Locale } from "@/i18n/routing";
import { getBlurDataURL } from "@/lib/image-placeholder";
import { getPublishedProjects } from "@/server/queries/projects";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "projects" });

  const projects = await getPublishedProjects(locale);
  const blurDataURL = getBlurDataURL(720, 450);

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
        <ProjectsExplorer projects={projects} blurDataURL={blurDataURL} />
      </Container>
    </section>
  );
}
