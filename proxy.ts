import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/es" || pathname.startsWith("/es/")) return NextResponse.next();
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
