//get single user by their id

import student from "@/model/student.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    const StudentExist = await student.findById(id);
    if (!StudentExist) {
      return NextResponse.json({
        message: "Student not found",
        status: 404,
        success: false,
      });
    }

    const adminExist = await getUser();
    if (!adminExist) {
      return NextResponse.json({
        message:
          "you're not authorized for this operation you need to login as admin",
        status: 404,
        success: false,
      });
    }

    const Admin = await User.findById(adminExist);
    if (!Admin.isAdmin) {
      return NextResponse.json({
        message: "You are not authorized to create student",
        status: 401,
      });
    }

    const deletedUser = await student.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Student deleted successfully",
      status: 200,
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};
