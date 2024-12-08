import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || ("" as string);
const setTeacher = async (teacherId: string) => {
  const teacher = jwt.sign({ teacherId }, secret, { expiresIn: "1d" });
  cookies().set("teacher", teacher, { httpOnly: true, secure: false });
  return teacher;
};

export default setTeacher;
