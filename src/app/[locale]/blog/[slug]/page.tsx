import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import Markdown from "@/components/content/Markdown";
import Container from "@/components/layout/Container";
import JsonLd from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  createBlogPostingSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/structured-data";
import { getPublishedBlogPostBySlug } from "@/server/queries/blog";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const getBlogPostMetaTitle = (locale: Locale, postTitle: string): string => {
  if (locale === "cs") {
    return `${postTitle} | Blog Viktora Vítovce`;
  }

  return `${postTitle} | Blog by Viktor Vítovec`;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const post = await getPublishedBlogPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!post) {
    return {};
  }

  const title = post.seoTitle ?? getBlogPostMetaTitle(locale, post.title);
  const description = post.seoDescription ?? post.excerpt ?? t("meta.fallbackDescription");

  return buildPageMetadata({
    locale,
    pathname: `/blog/${slug}`,
    title,
    description,
    type: "article",
    images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const post = await getPublishedBlogPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  if (!post) {
    notFound();
  }

  const date = post.publishedAt ?? post.createdAt;
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
  }).format(date);
  const metaTitle = post.seoTitle ?? getBlogPostMetaTitle(locale, post.title);
  const description =
    post.seoDescription ?? post.excerpt ?? t("meta.fallbackDescription");
  const breadcrumb = createBreadcrumbSchema(locale, [
    { name: nav("home"), pathname: "/" },
    { name: nav("blog"), pathname: "/blog" },
    { name: post.title, pathname: `/blog/${slug}` },
  ]);

  return (
    <>
      <JsonLd
        id={`blog-post-structured-data-${locale}-${slug}`}
        data={[
          createWebPageSchema({
            locale,
            pathname: `/blog/${slug}`,
            title: metaTitle,
            description,
          }),
          createBlogPostingSchema({
            locale,
            pathname: `/blog/${slug}`,
            title: post.title,
            description,
            image: post.coverImageUrl,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
          }),
          breadcrumb,
        ]}
      />
      <article className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("back")}
            </Link>
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{formattedDate}</span>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  {post.title}
                </h1>
                {post.excerpt ? (
                  <p className="text-lg leading-8 text-muted-foreground">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>

              {post.coverImageUrl ? (
                <figure className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm">
                  <img
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt ?? t("coverAlt", { title: post.title })}
                    className="aspect-[16/9] w-full object-cover"
                  />
                  {post.coverImageCaption ||
                  post.coverImageCredit ||
                  post.coverImageCreditUrl ? (
                    <figcaption className="border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
                      {post.coverImageCaption ? (
                        <span>{post.coverImageCaption}</span>
                      ) : null}
                      {post.coverImageCreditUrl ? (
                        <a
                          href={post.coverImageCreditUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="ml-2 underline underline-offset-4"
                        >
                          {post.coverImageCredit ?? t("imageCredit")}
                        </a>
                      ) : post.coverImageCredit ? (
                        <span className="ml-2">{post.coverImageCredit}</span>
                      ) : null}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-10">
              <Markdown content={post.contentMarkdown} />
            </div>

            <div className="mt-12 flex flex-wrap gap-3 border-t border-border/70 pt-8">
              <Button asChild variant="outline">
                <Link href="/blog">{t("morePosts")}</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">{t("talkCta")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
