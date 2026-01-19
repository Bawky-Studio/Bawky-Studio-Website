import { NextRequest, NextResponse } from "next/server";
import { redirect } from "./i18n/navigation";

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (url === "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/ko/main";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }
  if (url === "/en") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/en/main";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }
  if (url === "/ko") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/ko/main";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
