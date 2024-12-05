import connectDB from "@/DB/connectDB";
import User from "@/model/user.models";
import { NextResponse } from "next/server";

await connectDB();
export const GET = async () => {
  try {
    const alluser = await User.find();
    return NextResponse.json({
      success: true,
      message: "successfully fetched all users",
      status: 200,
      alluser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
      status: 500,
    });
  }
};
