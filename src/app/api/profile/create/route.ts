import connectDB from "@/DB/connectDB";
import Profile from "@/model/profile.models";
import Student from "@/model/student.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const { student, course } = await req.json();

    // Convert to ObjectId with error handling
    let studentId, courseId;
    try {
      studentId = new mongoose.Types.ObjectId(student);
      courseId = new mongoose.Types.ObjectId(course);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid student or course ID format",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if user is authenticated and admin
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized user", success: false },
        { status: 401 }
      );
    }

    const ISAdmin = await User.findById(user);
    if (!ISAdmin?.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized user", success: false },
        { status: 403 }
      );
    }

    // Check if profile already exists
    const existingProfile = await Profile.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingProfile) {
      return NextResponse.json(
        { message: "Profile already exists", success: false },
        { status: 400 }
      );
    }

    // Create the profile
    const newProfile = await Profile.create({
      student: studentId,
      course: courseId,
    });

    if (!newProfile) {
      return NextResponse.json(
        { message: "Failed to create profile", success: false },
        { status: 500 }
      );
    }

    // Update the student's Profile field with the new profile ID
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: { Profile: newProfile._id } },
      { new: true }
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { message: "Student not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Profile created and linked to student successfully",
        success: true,
        student: updatedStudent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  await connectDB();

  const user = await getUser();
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized user", success: false },
      { status: 404 }
    );
  }

  const isAdmin = await User.findById(user);
  if (!isAdmin?.isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized user", success: false },
      { status: 404 }
    );
  }

  const profiles = await Profile.find({})
    .populate("student")
    .populate("course")
    .populate("subject");

  return NextResponse.json(
    { message: "All profiles", success: true, profiles },
    { status: 200 }
  );
};
