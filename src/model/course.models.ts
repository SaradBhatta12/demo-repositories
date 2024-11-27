import mongoose, { Document, Model, Schema } from "mongoose";

// Define the Course interface extending Document for mongoose typing
interface ICourse extends Document {
  name: string;
  description?: string;
  syllabus?: string;
  duration?: string;
  image?: string;
  price: number;
  noOfSemesters?: number;
  students: mongoose.Schema.Types.ObjectId[]; // Reference to Student model
  subjects: mongoose.Schema.Types.ObjectId[]; // Reference to Subject model
  noOfSubjects?: number;
}

// Define the Course schema
const CourseSchema: Schema<ICourse> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    syllabus: { type: String, trim: true },
    duration: { type: String, trim: true },
    price: { type: Number, required: true },
    image: { type: String, trim: true },
    students: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // References Student
    ],
    subjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // References Subject
    ],
    noOfSemesters: { type: Number, min: 1 },
    noOfSubjects: { type: Number, min: 1 },
  },
  { timestamps: true }
);

// Check if the model already exists in mongoose.models, otherwise create it
const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
