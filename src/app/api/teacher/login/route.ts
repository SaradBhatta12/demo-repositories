import Teacher from "@/model/teacher.models";
import setTeacher from "@/utils/setTeacher";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const TeacherExist = await Teacher.findOne({
    email,
  });
  if (!TeacherExist) {
    return NextResponse.json({
      message: "Teacher does not exist",
      status: 404,
    });
  }
  const isPassMatch = (await TeacherExist.password) === password;
  if (!isPassMatch) {
    return NextResponse.json({
      message: "Password is incorrect",
      status: 401,
    });
  }
  const cookieSet = setTeacher(TeacherExist._id);
  return NextResponse.json({
    message: "Teacher logged in successfully",
    status: 200,
    TeacherExist,
  });
};
