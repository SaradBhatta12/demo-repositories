import connectDB from "@/DB/connectDB";
import user from "@/model/user.models";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface UserID extends JwtPayload {
  userId: string;
}
await connectDB();
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const secret = process.env.JWT_SECRET || ("" as string);
    let token = cookies().get("token")?.value as string;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    let decoded = jwt.verify(token, secret as string) as UserID;
    const userid = decoded?.userId;
    const userInfo = await user.findById(userid);
    return NextResponse.json(userInfo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
