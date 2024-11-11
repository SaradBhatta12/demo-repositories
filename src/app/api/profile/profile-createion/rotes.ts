import Profile from "@/model/profile.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { student, course, subject } = await req.json();
  const user = await getUser();
  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized user",
        success: false,
      },
      {
        status: 404,
      }
    );
  }
  const ISAdmin = await User.findById(user);
  if (!ISAdmin?.isAdmin) {
    return NextResponse.json(
      {
        message: "Unauthorized user",
        success: false,
      },
      {
        status: 404,
      }
    );
  }

  const newProfile = await Profile.create({
    student,
    course,
    subject,
  });
  return NextResponse.json(
    {
      message: "Profile created successfully",
      success: true,
    },
    {
      status: 200,
    }
  );
};

export const GET = async (req: NextRequest) => {
  const user = await getUser();
  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized user",
        success: false,
      },
      {
        status: 404,
      }
    );
  }

  const profiles = await Profile.find({})
    .populate("student")
    .populate("course")
    .populate("subject");
  return NextResponse.json(
    {
      message: "All profiles",
      success: true,
      profiles,
    },
    {
      status: 200,
    }
  );
};
