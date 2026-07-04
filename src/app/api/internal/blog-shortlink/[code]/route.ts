import { NextResponse, type NextRequest } from "next/server";

import { BlogPostStatus } from "@/generated/prisma";
import { db } from "@/server/db";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    code: string;
  }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { code } = await params;

  if (!/^\d{4}$/.test(code)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const index = Number.parseInt(code, 10) - 1;
  if (index < 0) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const posts = await db.blogPost.findMany({
    where: { status: BlogPostStatus.PUBLISHED },
    orderBy: [{ publishedAt: "asc" }, { createdAt: "asc" }],
    select: { slug: true },
  });

  const post = posts[index];
  if (!post) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.redirect(
    new URL(`/en/blog/${post.slug}`, request.url),
    308,
  );
}
