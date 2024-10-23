import student from "@/model/student.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formdata = await req.formData();
  const name = formdata.get("name");
  const email = formdata.get("email");
  const age = formdata.get("age");
  const password = formdata.get("password");
  const facaulty = formdata.get("facaulty");
  const image = formdata.get("image");
  const ListOfCourses = formdata.get("ListOfCourses");

  const ProfileImage = ImageUpload(image as File);
  let userExist = await getUser();
  if (!userExist) {
    return NextResponse.json({
      message: "Please login to create student",
      status: 400,
    });
  }
  if (email || name) {
    let user = await student.findOne({ email });
    if (user) {
      return NextResponse.json({
        message: "user already exist",
        status: 400,
      });
    }
    let userByName = await student.findOne({ name });
    if (userByName) {
      return NextResponse.json({
        message: "user already exist",
        status: 400,
      });
    }
  }

  const newStudent = new student({
    name,
    age,
    email,
    password,
    facaulty,
    courses: ListOfCourses,
    image: ProfileImage,
  });
  await newStudent.save();
  return NextResponse.json({
    message: "Student created successfully",
    status: 200,
  });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  let userid = await getUser();
  if (!userid) {
    return NextResponse.json({
      message: "Please login to view student",
    });
  }
  const students = await student.find();
  return NextResponse.json({
    message: "Student fetched successfully",
    students,
    status: 200,
  });
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const formdata = await req.formData();
  const name = formdata.get("name");
  const age = formdata.get("age");
  const email = formdata.get("email");
  const password = formdata.get("password");
  const facaulty = formdata.get("facaulty");
  const image = formdata.get("image");
  const ListOfCourses = formdata.get("ListOfCourses");

  let userid = await getUser();
  const userExist = await student.findById(userid);
  if (!userExist) {
    return NextResponse.json({
      message: "User not found",
    });
  }

  const updatedCourses = await student.findByIdAndUpdate(
    userid,
    {
      name,
      age,
      email,
      password,
      facaulty,
      courses: ListOfCourses,
      image,
    },
    { new: true }
  );

  return NextResponse.json({
    message: "Student updated successfully",
    updatedCourses,
    status: 200,
  });
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const userExist = await getUser();
    if (!userExist) {
      return NextResponse.json({
        message: "Please login to delete student",
        status: 400,
      });
    }
    await student.findByIdAndDelete(userExist);
    return NextResponse.json({
      message: "Student deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error ",
      status: 400,
    });
  }
};
