import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

const PUBLIC_PREFIXES = [
  "/logo",
  "/images",
  "/docs",
  "/documents",
  "/Ouvrier",
  "/Realisation",
  "/personel",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/_next",
  "/api",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const seg = pathname.split("/")[1] ?? "";

  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  if (isLocale(seg)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", seg);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)",
  ],
};
