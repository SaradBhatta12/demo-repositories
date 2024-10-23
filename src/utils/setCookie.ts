import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || ("" as string);
const setCookie = async (userId: string) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "1d" });
  cookies().set("token", token, { httpOnly: true, secure: false });
  return token;
};

export default setCookie;
