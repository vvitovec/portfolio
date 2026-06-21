import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import Markdown from "@/components/content/Markdown";
import Container from "@/components/layout/Container";
import NewsletterSignupForm from "@/components/newsletter/NewsletterSignupForm";
import JsonLd from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  createBlogPostingSchema,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/structured-data";
import {
  type BlogPostView,
  getPublishedBlogPostBySlug,
  getPublishedBlogPostNeighbors,
} from "@/server/queries/blog";

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

const coerceDate = (value: Date | string | null | undefined): Date | null => {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

type ArticlePointerProps = {
  direction: "previous" | "next";
  post: Pick<BlogPostView, "slug" | "title" | "coverImageUrl" | "coverImageAlt"> | null;
  title: string;
  placeholderTitle: string;
  placeholderDescription: string;
  placeholderImageLabel: string;
};

function ArticlePointer({
  direction,
  post,
  title,
  placeholderTitle,
  placeholderDescription,
  placeholderImageLabel,
}: ArticlePointerProps) {
  const isPrevious = direction === "previous";
  const content = (
    <>
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>{title}</span>
        {isPrevious ? (
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-center">
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
          {post?.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {placeholderImageLabel}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="line-clamp-2 font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {post ? post.title : placeholderTitle}
          </h2>
          {post ? null : (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {placeholderDescription}
            </p>
          )}
        </div>
      </div>
    </>
  );

  const className =
    "group flex min-h-48 flex-col justify-between gap-5 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm transition motion-safe:duration-300";

  if (!post) {
    return (
      <div className={`${className} text-muted-foreground`} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${className} motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    >
      {content}
    </Link>
  );
}

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
  const [post, neighbors] = await Promise.all([
    getPublishedBlogPostBySlug(slug, locale),
    getPublishedBlogPostNeighbors(slug, locale),
  ]);
  const t = await getTranslations({ locale, namespace: "blog" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  if (!post) {
    notFound();
  }

  const date = coerceDate(post.publishedAt) ?? coerceDate(post.createdAt) ?? new Date();
  const updatedAt = coerceDate(post.updatedAt) ?? date;
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
            datePublished: date,
            dateModified: updatedAt,
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

            <div className="mt-12 space-y-6 border-t border-border/70 pt-8">
              <nav
                className="grid gap-4 lg:grid-cols-2"
                aria-label={t("articleNavigation.label")}
              >
                <ArticlePointer
                  direction="previous"
                  post={neighbors.previous}
                  title={t("articleNavigation.previous")}
                  placeholderTitle={t("articleNavigation.firstTitle")}
                  placeholderDescription={t("articleNavigation.firstDescription")}
                  placeholderImageLabel={t("articleNavigation.firstImageLabel")}
                />
                <ArticlePointer
                  direction="next"
                  post={neighbors.next}
                  title={t("articleNavigation.next")}
                  placeholderTitle={t("articleNavigation.comingSoonTitle")}
                  placeholderDescription={t("articleNavigation.comingSoonDescription")}
                  placeholderImageLabel={t("articleNavigation.comingSoonImageLabel")}
                />
              </nav>
              <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm sm:p-7">
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t("newsletter.articleLabel")}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {t("newsletter.articleTitle")}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {t("newsletter.articleSubtitle")}
                    </p>
                  </div>
                  <NewsletterSignupForm source="blog-post" variant="inline" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
