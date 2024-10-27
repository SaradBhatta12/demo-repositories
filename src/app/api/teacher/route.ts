import connectDB from "@/DB/connectDB";
import teacher from "@/model/teacher.models";
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