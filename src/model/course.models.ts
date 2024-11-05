import mongoose, { Document, Schema } from "mongoose";

// Define the Course interface, extending from Document for mongoose types
interface Course extends Document {
  name: string;
  title: string;
  description: string;
  syllabus: string;
  duration: string;
  instructor: string;
  image: string;
  price: number;
  Student: mongoose.Types.ObjectId[]; // Reference to Student model
}

// Define the course schema
const CourseSchema: Schema = new Schema<Course>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    syllabus: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    Student: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Reference to Student
  },
  { timestamps: true }
);

// Model declaration
const Course =
  mongoose.models.Course || mongoose.model<Course>("Course", CourseSchema);

export default Course;
