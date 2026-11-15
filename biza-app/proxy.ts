import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

function redirectWithSession(response: NextResponse, url: URL) {
  const redirect = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);
  const authenticated = Boolean(user);

  if (!authenticated && (pathname.startsWith("/app") || pathname === "/onboarding")) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return redirectWithSession(response, loginUrl);
  }

  if (authenticated && (pathname === "/login" || pathname === "/register")) {
    const destination = request.nextUrl.searchParams.get("next");
    const safeDestination = destination === "/onboarding" || destination?.startsWith("/app/")
      ? destination
      : "/app";
    return redirectWithSession(response, new URL(safeDestination, request.url));
  }

  if (authenticated && pathname === "/courses") {
    const url = request.nextUrl.clone();
    url.pathname = "/app/courses";
    return redirectWithSession(response, url);
  }

  if (authenticated && pathname === "/scam-radar") {
    const url = request.nextUrl.clone();
    url.pathname = "/app/scam-radar";
    return redirectWithSession(response, url);
  }

  if (authenticated && pathname.startsWith("/courses/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/app${pathname}`;
    return redirectWithSession(response, url);
  }

  return response;
}

export const config = {
  matcher: ["/courses", "/courses/:path*", "/app/:path*", "/onboarding", "/login", "/register", "/scam-radar"],
};
