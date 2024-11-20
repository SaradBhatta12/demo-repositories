import connectDB from "@/DB/connectDB";
import { default as Student, default as student } from "@/model/student.models";
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

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    // Retrieve student ID for the authenticated user
    const studentId = await getUserFromStudent();
    if (!studentId) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Find the student by ID
    const studentData = await Student.findById(studentId).exec();
    console.log(studentData);
    if (!studentData) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Return the populated student data
    return NextResponse.json({ user: studentData, status: 200 });
  } catch (error) {
    console.error("Error fetching student data:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
