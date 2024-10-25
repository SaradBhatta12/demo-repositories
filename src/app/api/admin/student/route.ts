import connectDB from "@/DB/connectDB";
import student from "@/model/student.models";
import getUser from "@/utils/getUserFromCookie";
import { ImageUpload } from "@/utils/upload";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// POST: Create a new student
await connectDB();
export const POST = async (req: NextRequest) => {
  try {
    const formdata = await req.formData();

    // Extract form data fields
    const name = formdata.get("name");
    const email = formdata.get("email");
    const age = formdata.get("age");
    const password = formdata.get("password");
    const faculty = formdata.get("faculty");
    const image = formdata.get("image");
    const courses = formdata.get("courses");

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({
        message: "Name, Email, and Password are required",
        status: 400,
      });
    }

    // Check if the user is logged in
    const userExist = await getUser();
    if (!userExist) {
      return NextResponse.json({
        message: "Please login to create student",
        status: 401,
      });
    }

    // Check if the student already exists by email
    const existingStudent = await student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json({
        message: "Student with this email already exists",
        status: 400,
      });
    }

    // Handle image upload if available
    const ProfileImage = image ? await ImageUpload(image as File) : null;

    // Handle courses selection (assuming courses come as JSON string)
    let selectedCourses: mongoose.Types.ObjectId[] = [];
    if (courses) {
      const parsedCourses = JSON.parse(courses as string);
      selectedCourses = parsedCourses.map(
        (courseId: string) => new mongoose.Types.ObjectId(courseId)
      );
    }

    // Create a new student object
    const newStudent = new student({
      name,
      age,
      email,
      password,
      faculty,
      courses: selectedCourses, // Array of ObjectIds
      image: ProfileImage,
    });

    // Save the student to the database
    await newStudent.save();

    return NextResponse.json({
      message: "Student created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
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

    const students = await student.find();

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
