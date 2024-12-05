import connectDB from "@/DB/connectDB";
import student from "@/model/student.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload } from "@/utils/upload";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// POST: Create a new student
await connectDB();

export const POST = async (req: NextRequest) => {
  try {
    // Parse form data
    const formData = await req.formData();
    // Extract form fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const age = formData.get("age") as string | null;
    const password = formData.get("password") as string;
    const faculty = formData.get("faculty") as string | null;
    const image = formData.get("image") as File | null;
    const course = formData.get("course") as string | null;

    console.log(course);
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, Email, and Password are required" },
        { status: 400 }
      );
    }

    // Authenticate the user
    const userExist = await getUser();
    if (!userExist) {
      return NextResponse.json(
        { message: "Please login to create a student" },
        { status: 401 }
      );
    }

    // Check admin privileges
    const admin = await User.findById(userExist);
    if (!admin?.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to create a student" },
        { status: 403 }
      );
    }

    // Check for existing student by email
    const existingStudent = await student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json(
        { message: "Student with this email already exists" },
        { status: 409 }
      );
    }

    // Handle image upload if provided
    const profileImage = image ? await ImageUpload(image) : null;

    // Convert course ID if provided
    const courseID = course ? new mongoose.Types.ObjectId(course) : null;

    // Create and save the new student
    const newStudent = new student({
      name,
      age,
      email,
      password,
      faculty,
      Course: courseID,
      image: profileImage,
    });

    await newStudent.save();

    return NextResponse.json(
      { message: "Student created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating student:", error);

    // Handle Mongoose ObjectId casting errors gracefully
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return NextResponse.json(
        { message: "Invalid Course ID" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// GET: Fetch all students
export const GET = async () => {
  try {
    const userid = await getUser();
    if (!userid) {
      return NextResponse.json({
        message: "Please login to view students",
        status: 401,
      });
    }

    const students = await student.find().populate("Course");

    return NextResponse.json({
      message: "Students fetched successfully",
      students,
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

// PUT: Update student data
export const PUT = async (req: NextRequest) => {
  try {
    const formdata = await req.formData();
    const name = formdata.get("name");
    const age = formdata.get("age");
    const email = formdata.get("email");
    const password = formdata.get("password");
    const image = formdata.get("image");
    const Course = formdata.get("Course");
    const id = formdata.get("id");

    const isAdmin = await getUser();
    if (!isAdmin) {
      return NextResponse.json({
        message: "unauthorized..",
        success: false,
        status: 401,
      });
    }

    const admin = await User.findById(isAdmin);
    if (!admin?.isAdmin) {
      return NextResponse.json({
        message: "You are not authorized to update a student",
        status: 403,
      });
    }

    let imageURL;
    if (image) {
      const ProfileImage = await ImageUpload(image as File);
      imageURL = ProfileImage;
    }

    const updatedStudent = await student.findByIdAndUpdate(
      id,
      {
        name,
        age,
        email,
        password,
        Course,
        image: imageURL,
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

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const userExist = await getUser();
    if (!userExist) {
      return NextResponse.json({
        message: "Please login to delete student",
        status: 401,
      });
    }

    // Delete student by ID
    await student.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Student deleted successfully",
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
