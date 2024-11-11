import connectDB from "@/DB/connectDB";
import Subject from "@/model/subject.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import { PdfUpload } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ Id: string }>;
  }
) => {
  await connectDB();
  const Id = (await params).Id;
  const formData = await req.formData();

  const name = formData.get("name");
  const subjectCode = formData.get("subjectCode");
  const units = formData.get("units");
  const semester = formData.get("semester");
  const studyMeterial = formData.get("studyMeterial") as File;
  const referenceBook = formData.get("referenceBook");
  const description = formData.get("description");
  const syllabus = formData.get("syllabus");
  const assignment = formData.get("assignment");

  if (!Id) {
    return NextResponse.json({
      message: "SubjectId is required",
      status: 400,
      success: false,
    });
  }

  const Admin = await getUser();
  const ISAdminOrNot = await User.findById(Admin);
  if (!ISAdminOrNot?.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to access this route",
      status: 401,
      success: false,
    });
  }

  let studyMeterailPdf: string | null = null;
  if (studyMeterial) {
    studyMeterailPdf = await PdfUpload(studyMeterial)
  }
  let referenceBookPdf: string | null = null;
  if (referenceBook) {
    referenceBookPdf = await PdfUpload(referenceBook as File)
  }
  let syllabusPdf: string | null = null;
  if (syllabus) {
    syllabusPdf = await PdfUpload(syllabus as File)
  }

  const editedSubject = await Subject.findByIdAndUpdate(Id, {
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
  if (!editedSubject) {
    return NextResponse.json({
      message: "Subject not found",
      status: 404,
      success: false,
    });
  }
  return NextResponse.json({
    message: "Subject edited successfully",
    status: 200,
    success: true,
    editedSubject,
  });
};

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ Id: string }>;
  }
) => {
  const Id = (await params).Id;
  await connectDB();
  if (!Id) {
    return NextResponse.json({
      message: "SubjectId is required",
      status: 400,
      success: false,
    });
  }

  const Admin = await getUser();
  const ISAdminOrNot = await User.findById(Admin);
  if (!ISAdminOrNot?.isAdmin) {
    return NextResponse.json({
      message: "You are not authorized to access this route",
      status: 401,
      success: false,
    });
  }
  await Subject.findByIdAndDelete(Id);
  return NextResponse.json({
    message: "Subject deleted successfully",
    status: 200,
    success: true,
  });
};

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ Id: string }>;
  }
) => {
  const Id = (await params).Id;
  await connectDB();
  if (!Id) {
    return NextResponse.json({
      message: "SubjectId is required",
      status: 400,
      success: false,
    });
  }

  const subject = await Subject.findById(Id);
  if (!subject) {
    return NextResponse.json({
      message: "Subject not found",
      status: 404,
      success: false,
    });
  }
  return NextResponse.json({
    message: "Subject found",
    status: 200,
    success: true,
    subject,
  });
};
