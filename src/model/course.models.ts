import mongoose, { Document, Schema } from "mongoose";

// Define the Course interface, extending from Document for mongoose types
interface Course extends Document {
  name: string;
  title: string;
  description: string;
  syllabus: string;
  duration: string;
  instructor: string; //remove later
  image: string;
  price: number;
  noOfSemesters: number;
  Student: mongoose.Types.ObjectId[]; // Reference to Student model
  subjects: mongoose.Types.ObjectId[];
  noOfSubjects: number;
}

// Define the course schema
const CourseSchema: Schema = new Schema<Course>(
  {
    name: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    syllabus: { type: String },
    duration: { type: String },
    instructor: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    Student: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Reference to Student
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Reference to Subject
    noOfSemesters: { type: Number },
    noOfSubjects: { type: Number },
  },
  { timestamps: true }
);

// Model declaration
const Course =
  mongoose.models.Course || mongoose.model<Course>("Course", CourseSchema);

export default Course;
