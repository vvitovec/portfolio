import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  AppWindow,
  Database,
  LayoutTemplate,
  PenTool,
  Workflow,
} from "lucide-react";

import Container from "@/components/layout/Container";
import SectionReveal from "@/components/sections/project/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import JsonLd from "@/components/seo/JsonLd";
import { getPublishedProjects } from "@/server/queries/projects";
import WebsitesShowcase from "@/components/websites/WebsitesShowcase";
import { getBlurDataURL } from "@/lib/image-placeholder";
import { buildPageMetadata, PROFILE_IMAGE_PATH } from "@/lib/seo";
import {
  createPersonSchema,
  createWebPageSchema,
  createWebsiteSchema,
} from "@/lib/structured-data";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

const homeMetadataByLocale: Record<Locale, { title: string; description: string }> = {
  cs: {
    title: "Viktor Vítovec | IT a Web Developer",
    description:
      "Portfolio vývoje webů a digitálních produktů. Viktor Vítovec navrhuje rychlé, kvalitní a škálovatelné webové řešení.",
  },
  en: {
    title: "Viktor Vítovec | IT and Web Developer",
    description:
      "Web development and digital product portfolio by Viktor Vítovec. Fast, reliable, and conversion-focused websites.",
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const meta = homeMetadataByLocale[locale];

  return buildPageMetadata({
    locale,
    pathname: "/",
    title: meta.title,
    description: meta.description,
    type: "website",
    images: [PROFILE_IMAGE_PATH],
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const hero = await getTranslations({ locale, namespace: "hero" });
  const projectsT = await getTranslations({ locale, namespace: "projects" });
  const home = await getTranslations({ locale, namespace: "home" });
  const projects = await getPublishedProjects(locale);
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const blurDataURL = getBlurDataURL(1200, 675);
  const meta = homeMetadataByLocale[locale];
  const services = [
    {
      key: "design",
      icon: PenTool,
    },
    {
      key: "webApps",
      icon: AppWindow,
    },
    {
      key: "landingPages",
      icon: LayoutTemplate,
    },
    {
      key: "automation",
      icon: Workflow,
    },
    {
      key: "dataMl",
      icon: Database,
    },
  ] as const;

  return (
    <>
      <JsonLd
        id={`homepage-structured-data-${locale}`}
        data={[
          createPersonSchema(),
          createWebsiteSchema(locale),
          createWebPageSchema({
            locale,
            pathname: "/",
            title: meta.title,
            description: meta.description,
            includePerson: true,
          }),
        ]}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <SectionReveal className="grid gap-8 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_0.6fr)] lg:items-center">
            <div className="space-y-6">
              <div className="max-w-3xl space-y-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {home("identity.kicker")}
                </p>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {home("identity.title")}
                </h1>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {home("identity.subtitle")}
                </p>
              </div>
              <div className="max-w-2xl space-y-2 pt-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {home("about.kicker")}
                </p>
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {home("about.title")}
                </h2>
              </div>
              <div className="max-w-3xl space-y-4 text-sm text-muted-foreground sm:text-base">
                <p>{home("about.paragraphOne")}</p>
                <p>{home("about.paragraphTwo")}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                >
                  <Link href="/projects">{hero("primaryCta")}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                >
                  <Link href="/contact">{hero("secondaryCta")}</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-start lg:justify-end">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm">
                <Image
                  src={PROFILE_IMAGE_PATH}
                  alt={home("about.photoAlt")}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {featured.length > 0 ? (
        <section className="pb-12 sm:pb-16">
          <Container>
            <SectionReveal className="space-y-10">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {home("featured.title")}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {home("featured.subtitle")}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((project) => {
                  const summary = project.tagline ?? project.descriptionShort;
                  const stack = project.techStack.slice(0, 4);
                  const coverAlt = projectsT("coverAlt", {
                    title: project.title,
                  });

                  return (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-sm transition motion-safe:duration-300 motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                        {project.coverImageUrl ? (
                          <>
                            <Image
                              src={project.coverImageUrl}
                              alt={coverAlt}
                              fill
                              placeholder="blur"
                              blurDataURL={blurDataURL}
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {projectsT("title")}
                          </div>
                        )}
                      </div>
                      <div className="space-y-4 p-6">
                        <div className="space-y-2">
                          <div className="flex items-baseline justify-between gap-3">
                            <h3 className="min-w-0 font-display text-xl font-semibold text-foreground">
                              {project.title}
                            </h3>
                            <span className="shrink-0 text-right text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                              {project.year}
                            </span>
                          </div>
                          {summary ? (
                            <p className="text-sm text-muted-foreground">
                              {summary}
                            </p>
                          ) : null}
                        </div>
                        {stack.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {stack.map((item) => (
                              <Badge key={item}>{item}</Badge>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SectionReveal>
          </Container>
        </section>
      ) : null}

      <section className="pb-12 sm:pb-16">
        <Container>
          <SectionReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {home("websitesSection.title")}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {home("websitesSection.subtitle")}
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="shrink-0 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
              >
                <Link href="/websites">{home("websitesSection.cta")}</Link>
              </Button>
            </div>
            <WebsitesShowcase limit={3} />
          </SectionReveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionReveal className="space-y-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {home("services.title")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                {home("services.subtitle")}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.key}
                    className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm transition motion-safe:duration-300 motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted text-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {home(`services.items.${service.key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {home(`services.items.${service.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-sm md:p-10">
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl space-y-2">
                  <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    {home("cta.title")}
                  </h2>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {home("cta.subtitle")}
                  </p>
                </div>
                <Button
                  asChild
                  className="motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"
                >
                  <Link href="/contact">{home("cta.button")}</Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

    </>
  );
}
