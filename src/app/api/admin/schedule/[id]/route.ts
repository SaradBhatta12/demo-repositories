import schedule from "@/model/schedule.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    console.log(id);
    const user = await getUser();
    if (!user) {
      return NextResponse.json({
        message: "Unauthorized user detected",
        status: 400,
        success: false,
      });
    }

    const Admin = await User.findById(user);
    if (!Admin.isAdmin) {
      return NextResponse.json({
        message: "You are not authorized to create student",
        status: 401,
      });
    }

    const deletedSchedule = await schedule.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Schedule deleted successfully",
      deletedSchedule,
      status: 200,
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
