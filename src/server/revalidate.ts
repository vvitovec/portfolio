import 'server-only';

import { revalidatePath, revalidateTag } from 'next/cache';

import { CommentTargetType } from '@/generated/prisma';

type RevalidateProjectsInput = {
  slug?: string;
};

export const revalidatePublicProjects = ({ slug }: RevalidateProjectsInput) => {
  const config = { expire: 0 };
  revalidateTag('projects', config);
  revalidateTag('projects:cs', config);
  revalidateTag('projects:en', config);

  if (slug) {
    revalidateTag(`project:${slug}`, config);
    revalidateTag(`project:${slug}:cs`, config);
    revalidateTag(`project:${slug}:en`, config);
  }

  revalidatePath('/cs');
  revalidatePath('/en');
  revalidatePath('/cs/projects');
  revalidatePath('/en/projects');

  if (slug) {
    revalidatePath(`/cs/projects/${slug}`);
    revalidatePath(`/en/projects/${slug}`);
  }
};

export const revalidatePublicWebsites = () => {
  const config = { expire: 0 };
  revalidateTag('websites', config);
  revalidateTag('websites:cs', config);
  revalidateTag('websites:en', config);

  revalidatePath('/cs');
  revalidatePath('/en');
  revalidatePath('/cs/websites');
  revalidatePath('/en/websites');
};

type RevalidateBlogInput = {
  slug?: string;
};

export const revalidatePublicBlog = ({ slug }: RevalidateBlogInput = {}) => {
  const config = { expire: 0 };
  revalidateTag('blog-posts', config);
  revalidateTag('blog-posts:cs', config);
  revalidateTag('blog-posts:en', config);

  if (slug) {
    revalidateTag(`blog-post:${slug}`, config);
    revalidateTag(`blog-post:${slug}:cs`, config);
    revalidateTag(`blog-post:${slug}:en`, config);
  }

  revalidatePath('/cs');
  revalidatePath('/en');
  revalidatePath('/cs/blog');
  revalidatePath('/en/blog');

  if (slug) {
    revalidatePath(`/cs/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
  }
};

export const revalidatePublicComments = ({
  targetType,
  slug,
}: {
  targetType?: CommentTargetType;
  slug?: string;
} = {}) => {
  const config = { expire: 0 };
  revalidateTag('comments', config);
  revalidateTag('community', config);
  revalidateTag('community:cs', config);
  revalidateTag('community:en', config);

  revalidatePath('/cs/community');
  revalidatePath('/en/community');

  if (!targetType || !slug) {
    return;
  }

  revalidateTag(`comments:${targetType}:${slug}`, config);

  if (targetType === CommentTargetType.BLOG_POST) {
    revalidatePath(`/cs/blog/${slug}`);
    revalidatePath(`/en/blog/${slug}`);
    return;
  }

  revalidatePath(`/cs/projects/${slug}`);
  revalidatePath(`/en/projects/${slug}`);
};
