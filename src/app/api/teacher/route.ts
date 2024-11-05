import connectDB from "@/DB/connectDB";
import teacher from "@/model/teacher.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const POST = async (req: NextRequest, res: NextResponse) => {
  const formdata = await req.formData();

  const name = formdata.get("name");
  const age = formdata.get("age");
  const qualification = formdata.get("qualification");
  const module = formdata.get("module");
  const email = formdata.get("email");
  const password = formdata.get("password");

  console.log(name, age, qualification, module, email, password);
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const Admin = await User.findById(user);
  if (!Admin.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to create student",
      status: 401,
    });
  }
  if (!name || !age || !qualification || !email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }
  // Create a new teacher object
  const newTeacher = new teacher({
    name,
    age,
    qualification,
    module,
    email,
    password,
  });
  await newTeacher.save();
  return NextResponse.json({
    message: "Teacher created successfully",
    status: 200,
    newTeacher,
  });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  let userid = await getUser();
  if (!userid) {
    return NextResponse.json(
      { message: "Please login to view courses" },
      { status: 401 }
    );
  }

  const Admin = await User.findById(userid);
  if (!Admin.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to create student",
      status: 401,
    });
  }
  const teachers = await teacher.find();
  return NextResponse.json({
    message: "Teachers fetched successfully",
    teachers,
    status: 200,
  });
};
