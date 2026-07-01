import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
  revalidatePublicComments,
  revalidatePublicBlog,
  revalidatePublicProjects,
  revalidatePublicWebsites,
} from '@/server/revalidate';

export const runtime = 'nodejs';

const requestSchema = z.object({
  slug: z.string().trim().min(1).max(120).optional(),
  projects: z.boolean().optional(),
  websites: z.boolean().optional(),
  blog: z.boolean().optional(),
  comments: z.boolean().optional(),
});

const getBearerToken = (request: Request) => {
  const header = request.headers.get('authorization') ?? '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
};

export async function POST(request: Request) {
  const expectedSecret = process.env.PORTFOLIO_REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { success: false, error: 'Revalidate secret is not configured.' },
      { status: 503 },
    );
  }

  if (getBearerToken(request) !== expectedSecret) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = requestSchema.safeParse(await request.json().catch(() => ({})));
  if (!body.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid revalidate payload.' },
      { status: 400 },
    );
  }

  const shouldRevalidateProjects = body.data.projects ?? Boolean(body.data.slug);
  const shouldRevalidateWebsites = body.data.websites ?? false;
  const shouldRevalidateBlog = body.data.blog ?? false;
  const shouldRevalidateComments = body.data.comments ?? false;

  if (shouldRevalidateProjects) {
    revalidatePublicProjects({ slug: body.data.slug });
  }

  if (shouldRevalidateWebsites) {
    revalidatePublicWebsites();
  }

  if (shouldRevalidateBlog) {
    revalidatePublicBlog({ slug: body.data.slug });
  }

  if (shouldRevalidateComments) {
    revalidatePublicComments();
  }

  return NextResponse.json({
    success: true,
    projects: shouldRevalidateProjects,
    websites: shouldRevalidateWebsites,
    blog: shouldRevalidateBlog,
    comments: shouldRevalidateComments,
    slug: body.data.slug ?? null,
  });
}
