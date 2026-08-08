import { NextResponse, type NextRequest } from "next/server";
import { HOUSEHOLD_SESSION_COOKIE } from "@/lib/session-cookies";

/**
 * Gate the app behind the shared household login.
 * After login, the dashboard asks who is using the app; other features unlock then.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn =
    request.cookies.get(HOUSEHOLD_SESSION_COOKIE)?.value === "1";

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = isLoggedIn ? "/dashboard" : "/login";
    return NextResponse.redirect(url);
  }

  if (!isLoggedIn && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
