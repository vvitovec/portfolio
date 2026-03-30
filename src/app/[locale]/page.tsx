import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  AppWindow,
  ArrowRight,
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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
        {/* Atmospheric background */}
        <div className="pointer-events-none absolute inset-0 bg-mesh-warm" />

        <Container>
          <SectionReveal className="grid gap-12 lg:grid-cols-[minmax(0,_1.1fr)_minmax(0,_0.6fr)] lg:items-center">
            <div className="space-y-8">
              {/* Kicker */}
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent-gold" />
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
                  {home("identity.kicker")}
                </p>
              </div>

              {/* Title */}
              <div className="space-y-5">
                <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {home("identity.title")}
                </h1>
                <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                  {home("identity.subtitle")}
                </p>
              </div>

              {/* About */}
              <div className="space-y-4 border-l-2 border-accent-gold/30 pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
                  {home("about.kicker")}
                </p>
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {home("about.title")}
                </h2>
              </div>
              <div className="max-w-2xl space-y-4 text-sm text-muted-foreground sm:text-base">
                <p>{home("about.paragraphOne")}</p>
                <p>{home("about.paragraphTwo")}</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild variant="gold" size="lg">
                  <Link href="/projects">
                    {hero("primaryCta")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">{hero("secondaryCta")}</Link>
                </Button>
              </div>
            </div>

            {/* Profile image */}
            <div className="flex justify-start lg:justify-end">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border/40 shadow-2xl shadow-black/5 dark:shadow-black/20">
                <Image
                  src={PROFILE_IMAGE_PATH}
                  alt={home("about.photoAlt")}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                {/* Subtle gold gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      {featured.length > 0 ? (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionReveal className="space-y-12">
              <div className="flex items-end justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
                    {home("featured.title")}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    {home("featured.subtitle")}
                  </h2>
                </div>
                <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                  <Link href="/projects">
                    {hero("primaryCta")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent-gold/20 hover:shadow-xl hover:shadow-accent-gold/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {/* Cover image */}
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
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {projectsT("title")}
                          </div>
                        )}
                        {/* Year overlay */}
                        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                          {project.year}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-4 p-6">
                        <div className="space-y-2">
                          <h3 className="font-display text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent-gold">
                            {project.title}
                          </h3>
                          {summary ? (
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {summary}
                            </p>
                          ) : null}
                        </div>
                        {stack.length > 0 ? (
                          <div className="mt-auto flex flex-wrap items-center gap-1.5">
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

      {/* ─── SERVICES ─── */}
      <section className="relative py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-mesh-warm opacity-60" />
        <Container className="relative">
          <SectionReveal className="space-y-12">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
                {home("services.title")}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {home("services.subtitle")}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.key}
                    className="group rounded-2xl border border-border/40 bg-card/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent-gold/20 hover:shadow-lg hover:shadow-accent-gold/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/80 text-foreground transition-all duration-300 group-hover:border-accent-gold/30 group-hover:text-accent-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      {home(`services.items.${service.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {home(`services.items.${service.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl border border-accent-gold/20 bg-gradient-to-br from-card via-card to-accent-gold/5 p-10 shadow-lg shadow-accent-gold/5 md:p-14">
              {/* Decorative element */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-gold/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-accent-gold/5 blur-3xl" />

              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-lg space-y-3">
                  <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    {home("cta.title")}
                  </h2>
                  <p className="text-base text-muted-foreground">
                    {home("cta.subtitle")}
                  </p>
                </div>
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact">
                    {home("cta.button")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </>
  );
}
