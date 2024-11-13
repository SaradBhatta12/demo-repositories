import connectDB from "@/DB/connectDB";
import course from "@/model/course.models";
import user from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload, PdfUpload } from "@/utils/upload";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const POST = async (req: NextRequest) => {
  const formdata = await req.formData();
  const name = formdata.get("name");
  const title = formdata.get("title");
  const description = formdata.get("description");
  const syllabus = formdata.get("syllabus") as File;
  const duration = formdata.get("duration");
  const instructor = formdata.get("instructor");
  const image = formdata.get("image") as File;
  const price = formdata.get("price");
  const category = formdata.get("category");
  let allsubs = formdata.get("subjects");

  const subjects = JSON.parse(allsubs as string);
  const subjectsObjID = subjects.map(
    (sub: any) => new mongoose.Types.ObjectId(sub)
  );
  console.log(subjectsObjID);

  let userid = await getUser(); // Ensure getUser() is defined
  const userExist = await user.findById(userid);
  if (!userExist) {
    return NextResponse.json({
      message: "User not found",
    });
  }

  const Admin = await user.findById(userExist);
  if (!Admin?.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to create student",
      status: 401,
    });
  }

  // if (!image && !syllabus) {
  //   return NextResponse.json({
  //     message: "Please upload image and syllabus first",
  //   });
  // }

  let img;
  if (image) {
    const imageUrl = await ImageUpload(image); // Ensure ImageUpload is defined and handles file uploads
    img = imageUrl;
  }
  let syllabusIS;
  if (syllabus) {
    const syllabusUrl = await PdfUpload(syllabus); // Ensure PdfUpload is defined and handles file uploads
    syllabusIS = syllabusUrl;
  }

  const newCourse = await course.create({
    // Ensure course is defined (possibly a model)
    name,
    title,
    description,
    syllabus: syllabusIS,
    duration,
    instructor,
    image: img,
    price,
    category,
    User: userExist,
    subjects: subjectsObjID,
  });

  return NextResponse.json({
    message: "Course created successfully",
    course: newCourse,
    status: 200,
  });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  let userid = await getUser();
  if (!userid) {
    return NextResponse.json({
      message: "Please login to view courses",
    });
  }
  const courses = await course.find();
  return NextResponse.json({
    message: "Courses fetched successfully",
    courses,
    status: 200,
  });
};

export const DELETE = async (req: NextRequest) => {
  // Extract the 'id' from the URL query parameters
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      message: "Course ID is missing",
      status: 400,
    });
  }

  try {
    // Find the course by ID and delete it
    const deletedCourse = await course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json({
        message: "Course not found",
        status: 404,
      });
    }

    // Return success response
    return NextResponse.json({
      message: "Course deleted successfully",
      deletedCourse,
      status: 200,
    });
  } catch (error: any) {
    // Handle any errors that may occur
    return NextResponse.json({
      message: "Error deleting course",
      error: error.message,
      status: 500,
    });
  }
};
