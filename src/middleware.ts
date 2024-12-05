import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // List of public paths that are accessible without a token
  const isPublicPath = ["/login", "/register", "/", "/student/login"].includes(
    path
  );
  // Accessing cookies to get the token
  const cookie = cookies();
  const token = cookie.get("token")?.value || "";

  // Allow access to public paths regardless of token
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Add additional logic here if needed for other protected routes
  // For example, you can verify the token or check user roles here.

  return NextResponse.next(); // Continue to the next middleware or route
}

// Define which paths need authentication and protection
export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/profile/edit",
    "/profile/change-password",
    "/admin", // Add any protected paths here
    "/admin/add-teacher",
    "/admin/add-student",
    "/admin/add-subject",
    "/admin/teachers",
    "/users",
    "/admin/all-student",
    "/admin/all-courses",
    "/admin/all-subject",
    "/admin/all-teachers",
  ],
};
