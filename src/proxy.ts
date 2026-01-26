import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const adminRoutePattern = /^\/(cs|en)\/admin(\/|$)/;
const adminLoginPattern = /^\/(cs|en)\/admin\/login(\/|$)/;

export default async function middleware(request: NextRequest) {
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
