import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import Container from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { CommentTargetType } from '@/generated/prisma';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import { getCommunityThreads } from '@/server/queries/comments';

export const revalidate = 300;

type PageProps = {
  params: Promise<{ locale: string }>;
};

function getLocale(rawLocale: string): Locale {
  return routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
}

function formatDate(locale: Locale, value: Date | string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'community' });

  return buildPageMetadata({
    locale,
    pathname: '/community',
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export default async function CommunityPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'community' });
  const threads = await getCommunityThreads(locale, 50);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-4">
            <p className="text-muted-foreground flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t('label')}
            </p>
            <h1 className="font-display text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
              {t('title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8">{t('subtitle')}</p>
          </div>

          {threads.length === 0 ? (
            <div className="border-border/60 bg-card/80 text-muted-foreground rounded-2xl border p-6 text-sm">
              {t('empty')}
            </div>
          ) : (
            <div className="space-y-4">
              {threads.map((thread) => (
                <Link
                  key={thread.id}
                  href={`${thread.path}#comments`}
                  className="border-border/60 bg-card/80 hover:border-foreground/20 hover:bg-muted/30 block rounded-2xl border p-6 shadow-sm transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>
                        {thread.targetType === CommentTargetType.BLOG_POST
                          ? t('source.blog')
                          : t('source.project')}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {t('count', { count: thread.commentCount })}
                      </span>
                    </div>
                    <time className="text-muted-foreground text-xs">
                      {formatDate(locale, thread.lastCommentAt)}
                    </time>
                  </div>
                  <h2 className="font-display text-foreground mt-4 text-2xl font-semibold tracking-tight">
                    {thread.title}
                  </h2>
                  {thread.latestComment ? (
                    <div className="border-border mt-4 border-l pl-4">
                      <p className="text-foreground text-sm font-medium">
                        {thread.latestComment.authorName?.trim() || t('anonymous')}
                        {thread.latestComment.isAdmin ? (
                          <span className="text-primary ml-2 text-xs tracking-[0.2em] uppercase">
                            {t('adminBadge')}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-6">
                        {thread.latestComment.body}
                      </p>
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
