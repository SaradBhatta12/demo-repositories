import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
  }
  const Admin = await User.findById(user);
  if (!Admin.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to create student",
      status: 401,
    });
  }

  cookies().get("token")?.value ? cookies().delete("token") : null;
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
};
