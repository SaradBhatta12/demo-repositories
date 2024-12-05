import connectDB from "@/DB/connectDB";
import User from "@/model/user.models";
import { NextResponse } from "next/server";

await connectDB();
export const GET = async (req: Request) => {
  try {
    const id = req.url.split("/").pop();
    const user = await User.findById(id);
    return NextResponse.json({
      success: true,
      message: "successfully fetched userInfo",
      status: 200,
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 401,
      message: "Internal server error ",
    });
  }
};
