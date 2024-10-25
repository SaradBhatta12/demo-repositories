import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || ("" as string);
const setStudent = async (studentId: string) => {
  const student = jwt.sign({ studentId }, secret, { expiresIn: "1d" });
  cookies().set("student", student, { httpOnly: true, secure: false });
  return student;
};

export default setStudent;
