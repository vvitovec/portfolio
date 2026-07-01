import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import BlogPostCard from '@/components/blog/BlogPostCard';
import ProjectCard from '@/components/projects/ProjectCard';
import StoryCapture from '@/components/story/StoryCapture';
import WebsiteCard from '@/components/websites/WebsiteCard';
import { Locale as PrismaLocale } from '@/generated/prisma';
import { routing, type Locale } from '@/i18n/routing';
import { getBlurDataURL } from '@/lib/image-placeholder';
import { normalizeHttpUrl } from '@/lib/url-safety';
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import { getWebsitePreviewImageUrl, type WebsiteView } from '@/server/queries/websites';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Story asset | Admin',
  robots: {
    index: false,
    follow: false,
  },
};

const STORY_KINDS = ['project', 'blog', 'website'] as const;
type StoryKind = (typeof STORY_KINDS)[number];

type PageProps = {
  params: Promise<{ locale: string; kind: string; slug: string }>;
};

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  'Stavebnictví & reality': 'constructionRealEstate',
  'E-shop': 'eshop',
  Gastro: 'gastro',
  Poradenství: 'consulting',
  Aplikace: 'apps',
};

const isStoryKind = (value: string): value is StoryKind => STORY_KINDS.includes(value as StoryKind);

const getLocale = (rawLocale: string): Locale =>
  routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;

const toPrismaLocale = (locale: Locale) => (locale === 'en' ? PrismaLocale.en : PrismaLocale.cs);

const getWebsiteCategoryLabel = (
  website: WebsiteView,
  t: Awaited<ReturnType<typeof getTranslations>>,
) => {
  const key = CATEGORY_LABEL_KEYS[website.category];
  return key ? t(`categories.${key}`) : website.category;
};

const getDownloadName = (kind: StoryKind, slug: string) =>
  `vvitovec-${kind}-${slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}-story.png`;

async function assertAdmin(locale: Locale) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  if (!session.user?.isAdmin) {
    redirect(`/${locale}/admin/forbidden`);
  }
}

export default async function AdminStoryPage({ params }: PageProps) {
  const { locale: rawLocale, kind, slug } = await params;
  const locale = getLocale(rawLocale);

  await assertAdmin(locale);

  if (!isStoryKind(kind)) {
    notFound();
  }

  const blurDataURL = getBlurDataURL(720, 450);

  if (kind === 'project') {
    const [project, projectsT] = await Promise.all([
      db.project.findUnique({
        where: { slug },
        include: {
          translations: {
            where: { locale: toPrismaLocale(locale) },
            take: 1,
          },
        },
      }),
      getTranslations({ locale, namespace: 'projects' }),
    ]);

    const translation = project?.translations[0];

    if (!project || !translation) {
      notFound();
    }

    return (
      <StoryCapture downloadName={getDownloadName(kind, project.slug)}>
        <div className="w-full">
          <ProjectCard
            project={{
              id: project.id,
              slug: project.slug,
              title: translation.title,
              year:
                project.year ??
                (project.publishedAt ?? project.createdAt).getFullYear(),
              tagline: translation.tagline,
              descriptionShort: translation.descriptionShort,
              techStack: project.techStack,
              coverImageUrl: project.coverImageUrl,
            }}
            blurDataURL={blurDataURL}
            viewLabel={projectsT('view')}
            href={`/admin/projects/${project.id}`}
            priority
          />
        </div>
      </StoryCapture>
    );
  }

  if (kind === 'blog') {
    const post = await db.blogPost.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { locale: toPrismaLocale(locale) },
          take: 1,
        },
      },
    });

    const translation = post?.translations[0];

    if (!post || !translation) {
      notFound();
    }

    return (
      <StoryCapture downloadName={getDownloadName(kind, post.slug)}>
        <div className="w-full">
          <BlogPostCard
            post={{
              slug: post.slug,
              title: translation.title,
              excerpt: translation.excerpt,
              tags: post.tags,
              coverImageUrl: post.coverImageUrl,
              coverImageAlt: translation.coverImageAlt,
              publishedAt: post.publishedAt,
              createdAt: post.createdAt,
            }}
            locale={locale}
            variant="compact"
            priority
          />
        </div>
      </StoryCapture>
    );
  }

  const [website, websitesT] = await Promise.all([
    db.website.findUnique({ where: { id: slug } }),
    getTranslations({ locale, namespace: 'websites' }),
  ]);

  if (!website) {
    notFound();
  }

  const url = normalizeHttpUrl(website.url);

  if (!url) {
    notFound();
  }

  const websiteView: WebsiteView = {
    id: website.id,
    name: website.name,
    url,
    category: website.category,
    description: website.description,
    previewImageUrl: getWebsitePreviewImageUrl(url),
  };

  return (
    <StoryCapture downloadName={getDownloadName(kind, website.id)}>
      <div className="w-full">
        <WebsiteCard
          site={websiteView}
          categoryLabel={getWebsiteCategoryLabel(websiteView, websitesT)}
          exploreLabel={websitesT('explore')}
          href={`/admin/websites/${website.id}`}
        />
      </div>
    </StoryCapture>
  );
}
