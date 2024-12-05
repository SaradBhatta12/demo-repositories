import connectDB from "@/DB/connectDB";
import { default as Student, default as student } from "@/model/student.models";
import getUser, { getUserFromStudent } from "@/utils/getUserFromCookie";
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

// PUT: Update student data
export const PUT = async (req: NextRequest) => {
  try {
    const formdata = await req.formData();
    const name = formdata.get("name");
    const age = formdata.get("age");
    const email = formdata.get("email");
    const password = formdata.get("password");
    const faculty = formdata.get("faculty");
    const image = formdata.get("image");
    const courses = formdata.get("courses");

    const userid = await getUser();
    if (!userid) {
      return NextResponse.json({
        message: "Please login to update student",
        status: 401,
      });
    }

    // Find the student by ID
    const studentToUpdate = await student.findById(userid);
    if (!studentToUpdate) {
      return NextResponse.json({
        message: "Student not found",
        status: 404,
      });
    }

    // Update student fields
    const ProfileImage = image
      ? await ImageUpload(image as File)
      : studentToUpdate.image;

    const updatedStudent = await student.findByIdAndUpdate(
      userid,
      {
        name,
        age,
        email,
        password,
        faculty,
        courses,
        image: ProfileImage,
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Student updated successfully",
      student: updatedStudent,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
};
