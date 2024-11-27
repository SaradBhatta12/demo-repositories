import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // const path = req.nextUrl.pathname;
  // const isPublicPath = path === "/login" || path === "/register";
  // const token = req.cookies.get("token")?.value;
  // if (token) {
  //   try {
  //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  //     if (isPublicPath && decodedToken) {
  //       return NextResponse.redirect(new URL("/", req.url));
  //     }
  //     if (!isPublicPath && !decodedToken) {
  //       return NextResponse.redirect(new URL("/login", req.url));
  //     }
  //   } catch (error) {
  //     console.error("Invalid token:", error);
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // } else if (!isPublicPath) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
}

export const config = {
  matcher: [
    "/deshboard",
    "/",
    "/profile",
    "/profile/edit",
    "/profile/change-password",
  ],
};
