import connectDB from "@/DB/connectDB";
import User from "@/model/user.models";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Extend the JwtPayload interface to include the userId.
interface UserID extends JwtPayload {
  userId: string;
}

// Connect to the database
await connectDB();

export const GET = async () => {
  try {
    // Ensure JWT_SECRET exists
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Server error: JWT secret is not defined" },
        { status: 500 }
      );
    }

    // Retrieve token from cookies
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Decode and verify token
    let decoded: UserID;
    try {
      decoded = jwt.verify(token, secret) as UserID;
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }

    // Retrieve user from the database
    const userInfo = await User.findById(decoded.userId).select("-password");
    if (!userInfo) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return success with user info (excluding password)
    return NextResponse.json(
      { success: true, user: userInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error: Unable to fetch user details",
      },
      { status: 500 }
    );
  }
};
