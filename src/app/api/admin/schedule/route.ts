import connectDB from "@/DB/connectDB";
import schedule from "@/model/schedule.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const POST = async (req: NextRequest) => {
  try {
    const {
      title,
      description,
      date,
      location,
      startTime,
      endTime,
      teacher,
      course,
    } = await req.json();
    const user = await getUser();
    if (!user) {
      return NextResponse.json({
        message: "Unauthorized user detected",
        status: 400,
        success: false,
      });
    }

    const Admin = await User.findById(user);
    if (!Admin?.isAdmin) {
      return NextResponse.json({
        message: "You are not authorized to create student",
        status: 401,
      });
    }

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !startTime ||
      !endTime ||
      !teacher ||
      !course
    ) {
      return NextResponse.json({
        message: "Please fill all the fields",
        status: 400,
      });
    }

    const newSchedule = await schedule.create({
      title,
      description,
      date,
      location,
      startTime,
      endTime,
      teacher,
      course,
    });
    return NextResponse.json({
      message: "Schedule created successfully",
      newSchedule,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const schedules = await schedule.aggregate([
      {
        $lookup: {
          from: "teachers", // Collection name for teachers
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
      },
      { $unwind: "$teacher" },
      {
        $lookup: {
          from: "courses", // Collection name for courses
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          location: 1,
          startTime: 1,
          endTime: 1,
          date: 1, // If you want to include date
          time: 1, // If you want to include time
          "teacher.name": 1,
          "teacher.email": 1,
          "course.name": 1,
        },
      },
    ]);

    return NextResponse.json({
      message: "Schedules fetched successfully",
      schedules,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};
