import connectDB from "@/DB/connectDB";
import student from "@/model/student.models";
import { getUserFromStudent } from "@/utils/getUserFromCookie";
import setStudent from "@/utils/setStudent";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password } = await req.json();
  const user = await student.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }
  if (user.password !== password) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }
  await setStudent(user._id);
  return NextResponse.json({ message: "Login successful" }, { status: 200 });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const studentId = await getUserFromStudent();
  if (!studentId) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }
  const user = await student.findById(studentId);
  //also populate the courses
  if (!user) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }
  return NextResponse.json({ user, status: 200 });
};
