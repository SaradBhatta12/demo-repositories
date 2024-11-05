import connectDB from "@/DB/connectDB";
import schedule from "@/model/schedule.models";
import getUser from "@/utils/getUserFromCookie";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export const POST = async (req: NextRequest, res: NextResponse) => {
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
    const schedules = await schedule
      .find({})
      .populate("teacher", "name")
      .populate("course", "name"); // Populate the Course model

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
