import course from "@/model/course.models";
import { NextRequest, NextResponse } from "next/server";

interface userid {
  id: string;
}
export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    const id = await params.id;
    if (!id) {
      return NextResponse.json({
        message: "Course ID is required",
        status: 400,
      });
    }

    // Find the course by ID
    const ExistCourse = await course.findById(id);

    // Check if course exists
    if (!ExistCourse) {
      return NextResponse.json({
        message: "Course not found",
        status: 404,
      });
    }

    // Return the course data
    return NextResponse.json({
      message: "Course found",
      status: 200,
      data: ExistCourse,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
};
