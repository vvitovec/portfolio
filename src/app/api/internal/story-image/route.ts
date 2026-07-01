import { NextResponse } from 'next/server';

import { isSafePublicImageUrl } from '@/lib/url-safety';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl || imageUrl.startsWith('/') || !isSafePublicImageUrl(imageUrl)) {
    return NextResponse.json({ ok: false, error: 'Unsupported image URL.' }, { status: 400 });
  }

  let response: Response;

  try {
    response = await fetch(imageUrl, {
      headers: {
        Accept: 'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8',
      },
      next: { revalidate: 86400 },
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Image fetch failed.' }, { status: 502 });
  }

  if (!response.ok || !response.body) {
    return NextResponse.json({ ok: false, error: 'Image fetch failed.' }, { status: 502 });
  }

  const contentType = response.headers.get('content-type') ?? 'image/jpeg';

  if (!contentType.startsWith('image/')) {
    return NextResponse.json({ ok: false, error: 'Unsupported content type.' }, { status: 415 });
  }

  return new NextResponse(response.body, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'Content-Type': contentType,
    },
  });
}
