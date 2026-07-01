import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import BlogPostCard from '@/components/blog/BlogPostCard';
import ProjectCard from '@/components/projects/ProjectCard';
import StoryCapture from '@/components/story/StoryCapture';
import WebsiteCard from '@/components/websites/WebsiteCard';
import { routing, type Locale } from '@/i18n/routing';
import { buildLocalePath, buildPageMetadata, toAbsoluteUrl } from '@/lib/seo';
import { getBlurDataURL } from '@/lib/image-placeholder';
import { getPublishedBlogPostBySlug } from '@/server/queries/blog';
import { getPublishedProjectBySlug } from '@/server/queries/projects';
import { getPublishedWebsites, type WebsiteView } from '@/server/queries/websites';

export const revalidate = 300;

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

const getWebsiteCategoryLabel = (
  website: WebsiteView,
  t: Awaited<ReturnType<typeof getTranslations>>,
) => {
  const key = CATEGORY_LABEL_KEYS[website.category];
  return key ? t(`categories.${key}`) : website.category;
};

const getDownloadName = (kind: StoryKind, slug: string) =>
  `vvitovec-${kind}-${slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}-story.png`;

const getPublishedWebsiteForStory = async (slug: string, locale: Locale) => {
  const websites = await getPublishedWebsites(locale);
  return websites.find((website) => website.id === slug) ?? null;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, kind, slug } = await params;
  const locale = getLocale(rawLocale);
  const storyT = await getTranslations({ locale, namespace: 'story' });

  if (!isStoryKind(kind)) {
    return {};
  }

  let title: string | null = null;

  if (kind === 'project') {
    const project = await getPublishedProjectBySlug(slug, locale);
    title = project?.title ?? null;
  } else if (kind === 'blog') {
    const post = await getPublishedBlogPostBySlug(slug, locale);
    title = post?.title ?? null;
  } else {
    const website = await getPublishedWebsiteForStory(slug, locale);
    title = website?.name ?? null;
  }

  if (!title) {
    return {};
  }

  return buildPageMetadata({
    locale,
    pathname: `/story/${kind}/${slug}`,
    title: storyT('metaTitle', { title }),
    description: storyT('metaDescription'),
    noindex: true,
  });
}

export default async function StoryPage({ params }: PageProps) {
  const { locale: rawLocale, kind, slug } = await params;
  const locale = getLocale(rawLocale);

  if (!isStoryKind(kind)) {
    notFound();
  }

  const storyT = await getTranslations({ locale, namespace: 'story' });
  const blurDataURL = getBlurDataURL(720, 450);

  if (kind === 'project') {
    const [project, projectsT] = await Promise.all([
      getPublishedProjectBySlug(slug, locale),
      getTranslations({ locale, namespace: 'projects' }),
    ]);

    if (!project) {
      notFound();
    }

    const targetPath = `/projects/${project.slug}`;
    const targetUrl = toAbsoluteUrl(buildLocalePath(locale, targetPath));

    return (
      <StoryCapture
        title={storyT('metaTitle', { title: project.title })}
        targetUrl={targetUrl}
        downloadName={getDownloadName(kind, project.slug)}
      >
        <div className="w-full">
          <ProjectCard
            project={project}
            blurDataURL={blurDataURL}
            viewLabel={projectsT('view')}
            href={targetPath}
            priority
          />
        </div>
      </StoryCapture>
    );
  }

  if (kind === 'blog') {
    const post = await getPublishedBlogPostBySlug(slug, locale);

    if (!post) {
      notFound();
    }

    const targetPath = `/blog/${post.slug}`;
    const targetUrl = toAbsoluteUrl(buildLocalePath(locale, targetPath));

    return (
      <StoryCapture
        title={storyT('metaTitle', { title: post.title })}
        targetUrl={targetUrl}
        downloadName={getDownloadName(kind, post.slug)}
      >
        <div className="w-full">
          <BlogPostCard post={post} locale={locale} priority />
        </div>
      </StoryCapture>
    );
  }

  const [website, websitesT] = await Promise.all([
    getPublishedWebsiteForStory(slug, locale),
    getTranslations({ locale, namespace: 'websites' }),
  ]);

  if (!website) {
    notFound();
  }

  const targetPath = `/websites?site=${encodeURIComponent(website.id)}`;
  const targetUrl = toAbsoluteUrl(buildLocalePath(locale, targetPath));

  return (
    <StoryCapture
      title={storyT('metaTitle', { title: website.name })}
      targetUrl={targetUrl}
      downloadName={getDownloadName(kind, website.id)}
    >
      <div className="w-full">
        <WebsiteCard
          site={website}
          categoryLabel={getWebsiteCategoryLabel(website, websitesT)}
          exploreLabel={websitesT('explore')}
          href={targetPath}
        />
      </div>
    </StoryCapture>
  );
}
