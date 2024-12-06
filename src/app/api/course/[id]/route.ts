import course from "@/model/course.models";
import user from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload, PdfUpload } from "@/utils/upload";

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const formdata = await req.formData();
  const name = formdata.get("name");
  const description = formdata.get("description");
  const syllabus = formdata.get("syllabus") as File;
  const duration = formdata.get("duration");
  const image = formdata.get("image") as File;
  const price = formdata.get("price");

  // Fetch user details
  let userid = await getUser(); // Ensure getUser() is defined
  const userExist = await user.findById(userid);
  if (!userExist) {
    return NextResponse.json({
      message: "User not found",
      status: 404,
    });
  }

  const Admin = await user.findById(userExist);
  if (!Admin?.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to create student",
      status: 401,
    });
  }

  // Handle file uploads
  let imageUrl;
  if (image) {
    const img = await ImageUpload(image);
    imageUrl = img;
  }

  let syllabusUrl;
  if (syllabus) {
    const pdf = await PdfUpload(syllabus);
    const syllabusUrl = pdf;
  }

  // Get the course ID from the URL
  const id = req.nextUrl.pathname.split("/").pop(); // Assuming `id` is the last part of the URL

  // Update the course details
  const updatedCourses = await course.findByIdAndUpdate(
    id,
    {
      name,
      description,
      syllabus: syllabusUrl,
      duration,
      image: imageUrl,
      price,
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

export const GET = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.pathname.split("/").pop(); // Extract `id` from the URL

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "Invalid or missing course ID",
          status: 400,
        },
        { status: 400 }
      );
    }

    const courseDetails = await course.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "subjects", // Collection to join with (subjects collection)
          localField: "subjects", // Field in the course document containing ObjectId references
          foreignField: "_id", // Match against _id field in the subjects collection
          as: "mysubjects", // Alias for the matched subjects
        },
      },
    ]);

    if (!courseDetails || courseDetails.length === 0) {
      return NextResponse.json(
        {
          message: "Course not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course found",
        courseDetails: courseDetails[0], // Assuming a single course is fetched
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching course details:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        status: 500,
      },
      { status: 500 }
    );
  }
};
