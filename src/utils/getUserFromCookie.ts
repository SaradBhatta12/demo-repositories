import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface UserDetails extends JwtPayload {
  studentId: string;
}

const getUser = async (): Promise<string | null> => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return null;
    }

    const userDetails = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as UserDetails;
    const userId = userDetails.userId;
    console.log(userId);
    return userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export const getUserFromStudent = async () => {
  try {
    const student = cookies().get("student")?.value;
    if (!student) {
      return null;
    }

    const userDetails = jwt.verify(
      student,
      process.env.JWT_SECRET!
    ) as UserDetails;
    const userId = userDetails.studentId;

    return userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
export default getUser;
