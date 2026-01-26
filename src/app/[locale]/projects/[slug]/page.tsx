import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Container from "@/components/layout/Container";
import { getPublishedProjectBySlug } from "@/server/queries/projects";
import { routing, type Locale } from "@/i18n/routing";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const project = await getPublishedProjectBySlug(slug, locale);

  if (!project) {
    return {};
  }

  const description = project.descriptionShort ?? project.tagline ?? "";

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        cs: `/cs/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description,
      type: "article",
      images: project.coverImageUrl ? [project.coverImageUrl] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const project = await getPublishedProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {project.tagline ?? project.slug}
            </p>
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              {project.title}
            </h1>
            {project.descriptionShort ? (
              <p className="text-lg text-muted-foreground">
                {project.descriptionShort}
              </p>
            ) : null}
          </div>
          {project.highlights.length > 0 ? (
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-xl border border-border bg-card/80 px-4 py-3"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
