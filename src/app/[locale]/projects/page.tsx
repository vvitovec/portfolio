import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
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
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="rounded-2xl border border-border bg-card/80 p-6 transition hover:border-foreground/30"
            >
              <h2 className="font-display text-xl font-semibold text-foreground">
                {project.title}
              </h2>
              {project.descriptionShort ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.descriptionShort}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
