import course from "@/model/course.models";
import user from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload, PdfUpload } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
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

  // Fetch user details
  let userid = await getUser(); // Ensure getUser() is defined
  const userExist = await user.findById(userid);
  if (!userExist) {
    return NextResponse.json({
      message: "User not found",
      status: 404,
    });
  }

  // Validate the file uploads
  if (!image && !syllabus) {
    return NextResponse.json({
      message: "Please upload image and syllabus first",
      status: 400,
    });
  }

  // Handle file uploads
  const imageUrl = await ImageUpload(image);
  const syllabusUrl = await PdfUpload(syllabus);

  // Get the course ID from the URL
  const id = req.nextUrl.pathname.split("/").pop(); // Assuming `id` is the last part of the URL

  // Update the course details
  const updatedCourses = await course.findByIdAndUpdate(
    id,
    {
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
    },
    { new: true }
  );

  console.log(updatedCourses);

  if (!updatedCourses) {
    return NextResponse.json({
      message: "Course not found",
      status: 404,
    });
  }

  return NextResponse.json({
    message: "Course updated successfully",
    updatedCourses,
    status: 200,
  });
};
