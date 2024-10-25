import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "login" || path === "register";
  const token = cookies().get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/", "/admin/course", "/admin/student"],
};
