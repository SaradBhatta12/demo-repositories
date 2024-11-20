import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { NextResponse } from "next/server";

export const GET = async () => {
  const isAdmin = await getUser();
  if (!isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to access this page",
      status: 401,
    });
  }
  const admin = await User.findById(isAdmin);
  if (!admin?.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to access this page",
      status: 401,
    });
  }
  return NextResponse.json({
    message: "You are authorized to access this page",
    status: 200,
    success: true,
    admin,
  });
};
