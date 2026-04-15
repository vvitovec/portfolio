import { NextResponse } from "next/server";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/icon.png?v=20260415", request.url), 308);
}
