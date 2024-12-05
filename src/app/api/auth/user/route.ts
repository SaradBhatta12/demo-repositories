import connectDB from "@/DB/connectDB";
import User from "@/model/user.models";
import uploadImage from "@/utils/cloudinary";
import getUser from "@/utils/getUserFromCookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
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

export const DELETE = async (req: Request) => {
  try {
    // Parse request body for user ID
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid request: User ID is required" },
        { status: 400 }
      );
    }

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Verify admin privileges
    const adminId = await getUser();
    if (!adminId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin credentials missing" },
        { status: 401 }
      );
    }

    const admin = await User.findById(adminId);
    if (!admin || !admin.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin privileges required" },
        { status: 403 }
      );
    }

    // Check if the user exists before attempting deletion
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Perform deletion
    await User.findByIdAndDelete(id);
    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request) => {
  try {
    // Parse request body for user

    const formdata = await req.formData();
    const username = formdata.get("username");
    const email = formdata.get("email");
    const image = formdata.get("image");
    const role = formdata.get("role");
    const id = formdata.get("id");
    const uid = await getUser();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid request: User ID is required" },
        { status: 400 }
      );
    }

    // Verify admin privileges
    const adminId = await getUser();
    if (!adminId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin credentials missing" },
        { status: 401 }
      );
    }

    const admin = await User.findById(adminId);
    if (!admin || !admin.isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Admin privileges required" },
        { status: 403 }
      );
    }

    // Check if the user exists before attempting update
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    let profileImage;
    if (image) {
      let img = await uploadImage(image as File, "adminDetailsDivya");
      profileImage = img.secure_url;
    }

    console.log(role);
    // Perform update
    await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        image: profileImage,
        isAdmin: role === "Admin" ? true : false,
      },
      {
        new: true, // Return the updated document
      }
    );
    return NextResponse.json(
      { success: true, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
