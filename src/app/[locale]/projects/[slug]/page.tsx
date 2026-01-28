import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import Container from "@/components/layout/Container";
import CaseStudyBlocks from "@/components/sections/project/CaseStudyBlocks";
import ProjectCaseStudySection from "@/components/sections/project/ProjectCaseStudySection";
import ProjectGallerySection from "@/components/sections/project/ProjectGallerySection";
import ProjectHeroSection from "@/components/sections/project/ProjectHeroSection";
import ProjectHighlightsSection from "@/components/sections/project/ProjectHighlightsSection";
import SectionReveal from "@/components/sections/project/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPublishedProjectBySlug } from "@/server/queries/projects";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getBlurDataURL } from "@/lib/image-placeholder";
import type { CaseStudyBlock } from "@/types/case-study";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const hasText = (value?: string | null) => Boolean(value?.trim());

const hasStructuredCaseStudyContent = (blocks: CaseStudyBlock[]) =>
  blocks.some((block) => {
    if (block.type === "problem" || block.type === "solution") {
      return hasText(block.body);
    }
    if (block.type === "outcome") {
      return (
        hasText(block.body) ||
        block.bullets?.some((item) => item.trim().length > 0)
      );
    }
    return false;
  });

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const project = await getPublishedProjectBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  if (!project) {
    return {};
  }

  const description =
    project.descriptionShort ?? project.tagline ?? t("meta.fallbackDescription");
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const metadataBase = host ? new URL(`${proto}://${host}`) : undefined;
  const ogImageUrl = `/${locale}/api/og/project/${slug}`;

  return {
    metadataBase,
    title: `${project.title} — ${t("meta.titleSuffix")}`,
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
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;

  const project = await getPublishedProjectBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "projects" });

  if (!project) {
    notFound();
  }

  const blurDataURL = getBlurDataURL(1200, 675);
  const coverAlt = t("coverAlt", { title: project.title });
  const heroLabels = {
    roleLabel: t("detail.roleLabel"),
    statusLabel: t("detail.statusLabel"),
    statusPublished: t("detail.statusPublished"),
    techStackLabel: t("detail.techStackLabel"),
    linksLabel: t("detail.linksLabel"),
    liveLabel: t("detail.linkLive"),
    repoLabel: t("detail.linkRepo"),
  };
  const caseStudyLabels = {
    problem: t("caseStudyBlocks.problem"),
    solution: t("caseStudyBlocks.solution"),
    outcome: t("caseStudyBlocks.outcome"),
    image: t("caseStudyBlocks.image"),
  };
  const emptyCaseStudy = (
    <SectionReveal className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {t("caseStudyTitle")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("caseStudySummary")}
        </p>
      </div>
      <Card>
        <CardContent className="space-y-4 p-6 md:p-8">
          <p className="text-sm text-muted-foreground">{t("caseStudyEmpty")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm">
              <Link href="/contact">{t("caseStudyEmptyCtaContact")}</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/projects">{t("caseStudyEmptyCtaProjects")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </SectionReveal>
  );
  const caseStudyBlocks = project.caseStudyBlocks ?? [];
  const hasCaseStudyBlocks = caseStudyBlocks.length > 0;
  const hasStructuredCaseStudy = hasStructuredCaseStudyContent(caseStudyBlocks);
  const hasLegacyCaseStudy = hasText(project.descriptionLong);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="space-y-16">
          <ProjectHeroSection
            title={project.title}
            tagline={project.tagline}
            role={project.role}
            descriptionShort={project.descriptionShort}
            coverImageUrl={project.coverImageUrl}
            coverAlt={coverAlt}
            blurDataURL={blurDataURL}
            techStack={project.techStack}
            liveUrl={project.liveUrl}
            repoUrl={project.repoUrl}
            labels={heroLabels}
          />
          <ProjectHighlightsSection
            title={t("detail.highlightsTitle")}
            highlights={project.highlights}
          />
          {hasCaseStudyBlocks ? (
            hasStructuredCaseStudy ? (
              <CaseStudyBlocks
                blocks={caseStudyBlocks}
                title={t("caseStudyTitle")}
                summary={t("caseStudySummary")}
                labels={caseStudyLabels}
                imageAltFallback={t("caseStudyImageAlt")}
              />
            ) : (
              emptyCaseStudy
            )
          ) : hasLegacyCaseStudy ? (
            <>
              {/* TODO: After migration, drop descriptionLong (Prisma + migrations) and markdown pipeline. */}
              <ProjectCaseStudySection
                title={t("caseStudyTitle")}
                summary={t("caseStudySummary")}
                content={project.descriptionLong}
              />
            </>
          ) : (
            emptyCaseStudy
          )}
          <ProjectGallerySection
            title={project.title}
            images={project.galleryImageUrls}
            blurDataURL={blurDataURL}
          />
        </div>
      </Container>
    </section>
  );
}
