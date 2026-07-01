import 'server-only';

import { BlogPostStatus, CommentTargetType, ProjectStatus, type Locale } from '@/generated/prisma';
import { db } from '@/server/db';

type ResolvedCommentTarget = {
  type: CommentTargetType;
  slug: string;
  id: string;
  title: string;
  path: string;
};

function selectLocalizedTitle(
  translations: { locale: Locale; title: string }[],
  locale: Locale,
  fallback: string,
) {
  return (
    translations.find((translation) => translation.locale === locale)?.title ??
    translations.find((translation) => translation.locale === 'cs')?.title ??
    translations.find((translation) => translation.locale === 'en')?.title ??
    fallback
  );
}

export async function resolveCommentTarget({
  targetType,
  targetSlug,
  locale,
}: {
  targetType: CommentTargetType;
  targetSlug: string;
  locale: Locale;
}): Promise<ResolvedCommentTarget | null> {
  if (targetType === CommentTargetType.BLOG_POST) {
    const post = await db.blogPost.findFirst({
      where: { slug: targetSlug, status: BlogPostStatus.PUBLISHED },
      select: {
        id: true,
        slug: true,
        translations: {
          select: { locale: true, title: true },
        },
      },
    });

    if (!post) {
      return null;
    }

    return {
      type: targetType,
      slug: post.slug,
      id: post.id,
      title: selectLocalizedTitle(post.translations, locale, post.slug),
      path: `/blog/${post.slug}`,
    };
  }

  const project = await db.project.findFirst({
    where: { slug: targetSlug, status: ProjectStatus.PUBLISHED },
    select: {
      id: true,
      slug: true,
      translations: {
        select: { locale: true, title: true },
      },
    },
  });

  if (!project) {
    return null;
  }

  return {
    type: targetType,
    slug: project.slug,
    id: project.id,
    title: selectLocalizedTitle(project.translations, locale, project.slug),
    path: `/projects/${project.slug}`,
  };
}
