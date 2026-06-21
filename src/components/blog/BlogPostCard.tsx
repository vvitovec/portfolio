import { CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { BlogPostView } from "@/server/queries/blog";

type BlogPostCardProps = {
  post: Pick<
    BlogPostView,
    | "slug"
    | "title"
    | "excerpt"
    | "tags"
    | "coverImageUrl"
    | "coverImageAlt"
    | "publishedAt"
    | "createdAt"
  >;
  locale: Locale;
  priority?: boolean;
};

const coerceDate = (value: Date | string | null | undefined): Date | null => {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export default function BlogPostCard({
  post,
  locale,
  priority = false,
}: BlogPostCardProps) {
  const t = useTranslations("blog");
  const date = coerceDate(post.publishedAt) ?? coerceDate(post.createdAt) ?? new Date();
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm transition motion-safe:duration-300 motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.coverImageAlt ?? t("coverAlt", { title: post.title })}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("label")}
          </div>
        )}
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}
        </div>
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
