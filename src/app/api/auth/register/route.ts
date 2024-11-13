import connectDB from "@/DB/connectDB";
import user from "@/model/user.models";
import setCookie from "@/utils/setCookie";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Connected to database");

    // Parse request body
    const { username, email, password } = await req.json();
    console.log(username, email, password);

    // Check if the user already exists
    let userExist =
      (await user.findOne({ email })) || (await user.findOne({ username }));
    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    let newUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    // Set cookie
    await setCookie(newUser._id as string);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: newUser,
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
