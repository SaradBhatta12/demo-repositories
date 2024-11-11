import connectDB from "@/DB/connectDB";
import Subject from "@/model/subject.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { PdfUpload } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  await connectDB();

  // get all things from formdata at a time
  const formData = await req.formData();

  const name = formData.get("name");
  const subjectCode = formData.get("subjectCode");
  const units = formData.get("units");
  const semester = formData.get("semester");
  const studyMeterial = formData.get("studyMaterial") as File;
  const referenceBook = formData.get("referenceBook");
  const description = formData.get("description");
  const syllabus = formData.get("syllabus");
  const assignment = formData.get("assignment");

  if (!name || !subjectCode || !units || !semester) {
    return NextResponse.json({
      message: "Please fill all the fields",
      status: 400,
      success: false,
    });
  }

  const Admin = await getUser();
  const ISAdminOrNot = await User.findById(Admin);
  console.log(ISAdminOrNot);
  if (!ISAdminOrNot?.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to access this route",
      status: 401,
      success: false,
    });
  }

  let studyMeterailPdf: string | null = null;
  if (studyMeterial) {
    studyMeterailPdf = await PdfUpload(studyMeterial);
  }
  let referenceBookPdf: string | null = null;
  if (referenceBook) {
    referenceBookPdf = await PdfUpload(referenceBook as File);
  }
  let syllabusPdf: string | null = null;
  if (syllabus) {
    syllabusPdf = await PdfUpload(syllabus as File);
  }

  const newSubject = Subject.create({
    name,
    subjectCode,
    units,
    semester,
    studyMeterial: studyMeterailPdf,
    referenceBook: referenceBookPdf,
    description,
    syllabus: syllabusPdf,
    assignment,
  });
  return NextResponse.json({
    message: "Subject created successfully",
    status: 200,
    success: true,
  });
};

export const GET = async (req: NextRequest) => {
  await connectDB();
  const subjects = await Subject.find();
  return NextResponse.json({
    message: "Subjects fetched successfully",
    status: 200,
    success: true,
    subjects,
  });
};
