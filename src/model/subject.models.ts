import mongoose from "mongoose";

interface ISubject {
  name: string;
  subjectCode: string;
  units: number;
  semester: number;
  studyMeterial: string[];
  referenceBook: string[];
  course: mongoose.Types.ObjectId;
  Student: mongoose.Types.ObjectId[];
  description: string;
  syllabus: string;
  assignment: mongoose.Types.ObjectId[];
}

const subjectSchema = new mongoose.Schema<ISubject>({
  name: { type: String, required: true },
  subjectCode: { type: String, required: true },
  units: { type: Number },
  semester: { type: Number },
  studyMeterial: { type: [String] },
  referenceBook: { type: [String] },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  Student: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  description: { type: String, required: true },
  syllabus: { type: String },
  assignment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
});

const Subject =
  mongoose.models.Subject || mongoose.model<ISubject>("Subject", subjectSchema);
export default Subject;
