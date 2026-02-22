import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const adminRoutePattern = /^\/(cs|en)\/admin(\/|$)/;
const adminLoginPattern = /^\/(cs|en)\/admin\/login(\/|$)/;
const localhostPattern = /^(localhost|127\.0\.0\.1)$/i;
const CANONICAL_HOST = process.env.NEXT_PUBLIC_CANONICAL_HOST ?? "vitovec.com";

function getCanonicalRedirect(request: NextRequest): NextResponse | null {
  const currentHostHeader =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!currentHostHeader) {
    return null;
  }

  const currentHost = currentHostHeader.split(":")[0]?.toLowerCase() ?? "";
  if (localhostPattern.test(currentHost)) {
    return null;
  }

  const forwardedProto =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  const wwwHost = `www.${CANONICAL_HOST}`;
  const isCanonicalHost = currentHost === CANONICAL_HOST;
  const isWwwHost = currentHost === wwwHost;
  const shouldUpgradeToHttps = (isCanonicalHost || isWwwHost) && forwardedProto !== "https";
  const shouldStripWww = isWwwHost;

  if (!shouldUpgradeToHttps && !shouldStripWww) {
    return null;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https";
  redirectUrl.host = CANONICAL_HOST;

  return NextResponse.redirect(redirectUrl, 308);
}

export default async function middleware(request: NextRequest) {
  const canonicalRedirect = getCanonicalRedirect(request);
  if (canonicalRedirect) {
    return canonicalRedirect;
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    if (!token.isAdmin) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(request);

  if (!adminRoutePattern.test(pathname) || adminLoginPattern.test(pathname)) {
    return intlResponse;
  }

  const match = pathname.match(adminRoutePattern);
  const locale = match?.[1] ?? routing.defaultLocale;

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin/login`, request.url),
    );
  }

  if (!token.isAdmin) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin/forbidden`, request.url),
    );
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)", "/api/admin/:path*"],
};
