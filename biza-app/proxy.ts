import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const cookie = request.cookies.get("biza_onboarding_complete");
  const isLoggedIn = cookie?.value === "true";

  // Authenticated user logic
  if (isLoggedIn) {
    if (pathname === "/courses") {
      return NextResponse.redirect(new URL("/app/courses" + search, request.url));
    }
    if (pathname === "/scam-radar") {
      return NextResponse.redirect(new URL("/app/scam-radar" + search, request.url));
    }
    
    // Redirect /courses/[categorySlug] to /app/courses?category=[categorySlug]
    // But ONLY if it's just the category slug, not an opportunity slug or deeper
    // e.g. /courses/selling-online -> /app/courses?category=selling-online
    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] === 'courses' && parts.length === 2) {
      const categorySlug = parts[1];
      const newUrl = new URL("/app/courses", request.url);
      newUrl.searchParams.set("category", categorySlug);
      // preserve existing search params if any, though usually there aren't
      request.nextUrl.searchParams.forEach((val, key) => {
        if (key !== "category") newUrl.searchParams.set(key, val);
      });
      return NextResponse.redirect(newUrl);
    }

    // Redirect deeper /courses/... to /app/courses/...
    // e.g. /courses/selling-online/dropshipping -> /app/courses/selling-online/dropshipping
    if (parts[0] === 'courses' && parts.length >= 3) {
      const newPath = "/app" + pathname;
      return NextResponse.redirect(new URL(newPath + search, request.url));
    }

    if (pathname === "/onboarding" || pathname === "/login") {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  // Guest user logic
  if (!isLoggedIn) {
    if (pathname.startsWith("/app")) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/courses",
    "/courses/:path*",
    "/app/:path*",
    "/onboarding",
    "/login",
    "/scam-radar",
  ],
};
