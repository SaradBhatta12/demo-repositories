import connectDB from "@/DB/connectDB";
import { getUserFromStudent } from "@/utils/getUserFromCookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const GET = async (req: NextRequest, res: NextResponse) => {
  //logout from student
  try {
    const student = await getUserFromStudent();
    if (!student) {
      return NextResponse.json({
        message: "you're already logged out",
        status: 201,
        success: true,
      });
    }
    const modifyCookie = (await cookies().get("student"))
      ? cookies().delete("student")
      : null;
    return NextResponse.json({
      message: "logout successfully",
      status: 201,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong",
      status: 201,
      success: false,
    });
    console.log(error);
  }
};
