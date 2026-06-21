import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import BlogPostCard from "@/components/blog/BlogPostCard";
import Container from "@/components/layout/Container";
import BlogNewsletterClientState from "@/components/newsletter/BlogNewsletterClientState";
import JsonLd from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createItemListSchema,
  createWebPageSchema,
} from "@/lib/structured-data";
import { getPublishedBlogPosts } from "@/server/queries/blog";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

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

export default async function BlogPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const posts = await getPublishedBlogPosts(locale);
  const meta = blogMetadataByLocale[locale];
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
          createItemListSchema(
            locale,
            "/blog",
            t("title"),
            posts.map((post) => ({
              name: post.title,
              pathname: `/blog/${post.slug}`,
              description: post.excerpt,
            })),
          ),
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
          <Suspense fallback={null}>
            <BlogNewsletterClientState />
          </Suspense>
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
