import connectDB from "@/DB/connectDB";
import Student from "@/model/student.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split("/").pop();

  const userExist = await getUser();
  if (!userExist) {
    return NextResponse.json({
      message: "unauthorized..",
      status: 401,
      success: false,
    });
  }
  const admin = await User.findById(userExist);
  if (!admin?.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to update a student",
      status: 403,
      success: false,
    });
  }

  const StudentDetails = await Student.findById(id);

  return NextResponse.json({
    message: "Student details",
    StudentDetails,
    status: 200,
    success: true,
  });
};

export const PUT = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split("/").pop();
  const userExist = await getUser();
  if (!userExist) {
    return Response.json({
      message: "unauthorized..",
      status: 401,
      success: false,
    });
  }
  const admin = await User.findById(userExist);
  if (!admin?.isAdmin) {
    return Response.json({
      message: "You are not authorized to update a student",
      status: 403,
      success: false,
    });
  }
  try {
    const formdata = await req.formData();
    const name = formdata.get("name") as string;
    const age = formdata.get("age") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const Course = formdata.get("Course") as string;
    const image = formdata.get("image") as File;

    const ageInNumber = parseInt(age);
    let imageURL;
    if (image) {
      const img = await ImageUpload(image as File);
      imageURL = img;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        age: ageInNumber,
        email,
        password,
        Course,
        image: imageURL,
      },
      { new: true }
    );

    return Response.json({
      message: "Student updated successfully",
      student: updatedStudent,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};
