import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Redirect root to /main (will be localized by next-intl middleware on next pass)
  const url = request.nextUrl.pathname;

  if (url === "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/ko/main";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }
  else if (url === "/en") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/en/main";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }
  else if (url === "/ko") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/ko/main";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }
  // Delegate all other paths to next-intl middleware (locale handling)
  //return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)", '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};