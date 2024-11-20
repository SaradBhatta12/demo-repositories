import mongoose, { Document, Model, Schema } from "mongoose";

// Define the Course interface extending Document for mongoose typing
interface ICourse extends Document {
  name: string;
  title?: string;
  description?: string;
  syllabus?: string;
  duration?: string;
  image?: string;
  price: number;
  noOfSemesters?: number;
  students: mongoose.Types.ObjectId[]; // Reference to Student model
  subjects: mongoose.Types.ObjectId[]; // Reference to Subject model
  noOfSubjects?: number;
}

// Define the Course schema
const CourseSchema: Schema<ICourse> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    syllabus: { type: String, trim: true },
    duration: { type: String, trim: true },
    price: { type: Number, required: true },
    image: { type: String, trim: true },
    students: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false },
    ], // References Student
    subjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: false },
    ], // References Subject
    noOfSemesters: { type: Number, min: 1 },
    noOfSubjects: { type: Number, min: 1 },
  },
  { timestamps: true }
);

// Middleware for any logic before saving
CourseSchema.pre<ICourse>("save", function (next) {
  // Add additional logic if needed before saving the course
  // For example: validate subject counts or student counts
  if (!this.noOfSubjects) {
    this.noOfSubjects = this.subjects.length;
  }
  next();
});

// Model declaration with type support
const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
