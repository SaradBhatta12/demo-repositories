import mongoose from "mongoose";

interface ISubject {
  name: string;
  subjectCode: string;
  units: number;
  semester: number;
  studyMaterial: string[];
  referenceBook: string[];
  description: string;
  syllabus: string;
  course: mongoose.Schema.Types.ObjectId;
}

const SubjectSchema = new mongoose.Schema<ISubject>({
  name: { type: String, required: true },
  subjectCode: { type: String, required: true },
  units: { type: Number },
  semester: { type: Number },
  studyMaterial: { type: [String] },
  referenceBook: { type: [String] },
  description: { type: String, required: true },
  syllabus: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Reference to Course model
});

const Subject =
  mongoose.models.Subject || mongoose.model<ISubject>("Subject", SubjectSchema);
export default Subject;
