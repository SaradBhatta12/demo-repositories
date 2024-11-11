import connectDB from "@/DB/connectDB";
import user from "@/model/user.models";
import setCookie from "@/utils/setCookie";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password } = await req.json();

  const UserExist = await user.findOne({ email: email });
  if (!UserExist)
    NextResponse.json({ message: "User Not Found" }, { status: 404 });
  if (UserExist?.password !== password)
    NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
  await setCookie(UserExist?._id as string);
  return NextResponse.json({ message: "Login Success" }, { status: 200 });
};
