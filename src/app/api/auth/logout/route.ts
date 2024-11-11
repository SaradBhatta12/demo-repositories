import getUser from "@/utils/getUserFromCookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  // Get the current user from the cookie
  const user = await getUser();

  // If no user is found, respond with an unauthorized message
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized: No user found." },
      { status: 401 }
    );
  }

  // Check if the "token" cookie exists before trying to delete it
  const token = cookies().get("token");
  if (token) {
    cookies().delete("token");
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } else {
    return NextResponse.json({
      message: "No active session found. You are already logged out.",
      status: 404,
    });
  }
};
