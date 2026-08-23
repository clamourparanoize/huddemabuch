import { NextResponse, type NextRequest } from "next/server";

import { checkAdminBasicAuth } from "@/lib/basic-auth";

// Next.js 16: "middleware.ts" heißt jetzt "proxy.ts" (siehe
// node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const basicAuthResponse = checkAdminBasicAuth(request);
    if (basicAuthResponse) return basicAuthResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
