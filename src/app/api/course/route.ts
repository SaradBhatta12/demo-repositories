import connectDB from "@/DB/connectDB";
import course from "@/model/course.models";
import user from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload, PdfUpload } from "@/utils/upload";
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

  let userid = await getUser(); // Ensure getUser() is defined
  const userExist = await user.findById(userid);
  if (!userExist) {
    return NextResponse.json({
      message: "User not found",
    });
  }

  if (!image && !syllabus) {
    return NextResponse.json({
      message: "Please upload image and syllabus first",
    });
  }

  const imageUrl = await ImageUpload(image); // Ensure ImageUpload is defined and handles file uploads
  const syllabusUrl = await PdfUpload(syllabus); // Ensure PdfUpload is defined and handles file uploads

  const newCourse = await course.create({
    // Ensure course is defined (possibly a model)
    name,
    title,
    description,
    syllabus: syllabusUrl,
    duration,
    instructor,
    image: imageUrl,
    price,
    category,
    User: userExist,
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
