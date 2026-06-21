import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BlogPostCard from "@/components/blog/BlogPostCard";
import Container from "@/components/layout/Container";
import NewsletterSignupForm from "@/components/newsletter/NewsletterSignupForm";
import JsonLd from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/structured-data";
import { getPublishedBlogPosts } from "@/server/queries/blog";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ newsletter?: string }>;
};

const newsletterStatuses = new Set(["confirmed", "unsubscribed", "invalid"]);

const blogMetadataByLocale: Record<Locale, { title: string; description: string }> =
  {
    cs: {
      title: "Blog | Viktor Vítovec",
      description:
        "Osobní poznámky o AI, automatizaci, vývoji, týmech a technologiích od Viktora Vítovce.",
    },
    en: {
      title: "Blog | Viktor Vítovec",
      description:
        "Personal notes on AI, automation, development, teams, and technology by Viktor Vítovec.",
    },
  };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const meta = blogMetadataByLocale[locale];

  return buildPageMetadata({
    locale,
    pathname: "/blog",
    title: meta.title,
    description: meta.description,
    type: "website",
  });
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  const resolvedSearchParams = await searchParams;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const posts = await getPublishedBlogPosts(locale);
  const meta = blogMetadataByLocale[locale];
  const newsletterStatus = newsletterStatuses.has(
    resolvedSearchParams?.newsletter ?? "",
  )
    ? resolvedSearchParams?.newsletter
    : null;
  const breadcrumb = createBreadcrumbSchema(locale, [
    { name: nav("home"), pathname: "/" },
    { name: nav("blog"), pathname: "/blog" },
  ]);

  return (
    <>
      <JsonLd
        id={`blog-structured-data-${locale}`}
        data={[
          createWebPageSchema({
            locale,
            pathname: "/blog",
            title: meta.title,
            description: meta.description,
          }),
          breadcrumb,
        ]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("label")}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
          {newsletterStatus ? (
            <div className="mt-8 max-w-3xl rounded-2xl border border-border/60 bg-card/80 p-5 text-sm text-muted-foreground">
              {t(`newsletter.status.${newsletterStatus}`)}
            </div>
          ) : null}
          <NewsletterSignupForm />
          {posts.length > 0 ? (
            <div className="mt-10 flex max-w-5xl flex-col gap-5">
              {posts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  priority={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-border/60 bg-card/80 p-6 text-sm text-muted-foreground shadow-sm md:p-8">
              {t("empty")}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
