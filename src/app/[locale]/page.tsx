import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPublishedProjects } from "@/server/queries/projects";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const hero = await getTranslations({ locale, namespace: "hero" });
  const projectsT = await getTranslations({ locale, namespace: "projects" });
  const projects = await getPublishedProjects(locale);
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {hero("title")}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              {hero("subtitle")}
            </p>
          </div>
        </Container>
      </section>
      {featured.length > 0 ? (
        <section className="pb-20 sm:pb-28">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {projectsT("title")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                {projectsT("subtitle")}
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {featured.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="rounded-2xl border border-border bg-card/80 p-6 transition hover:border-foreground/30"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
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
      ) : null}
    </>
  );
}
