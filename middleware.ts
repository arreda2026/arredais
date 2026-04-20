import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Passe-laisse explicite : aide Next à toujours émettre `middleware-manifest.json` en dev. */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)",
  ],
};
