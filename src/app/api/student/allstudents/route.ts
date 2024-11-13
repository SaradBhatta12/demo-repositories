import Student from "@/model/student.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const isUser = await getUser();
    if (!isUser) {
      return NextResponse.json({
        message: "Please login to view courses",
        status: 401,
        success: false,
      });
    }
    const Admin = await User.findById(isUser);

    if (!Admin?.isAdmin) {
      return NextResponse.json({
        message: "You are not authorized to view courses",
        status: 401,
        success: false,
      });
    }
    const students = await Student.find({});
    return NextResponse.json({
      message: "All students",
      status: 200,
      success: true,
      students,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};
