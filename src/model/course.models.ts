import mongoose, { Document, Schema } from "mongoose";

// Define the Course interface, extending from Document for mongoose types
interface Course extends Document {
  name: string;
  title: string;
  description: string;
  syllabus: string;
  duration: string;
  instructor: string;
  rating: number;
  image: string;
  price: number;
  category: string;
  User: mongoose.Types.ObjectId;
  Student: mongoose.Types.ObjectId;
}

// Define the course schema
const courseSchema = new Schema<Course>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  syllabus: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  instructor: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "Course",
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, // This should typically be required if you are linking with users
  },
  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true, // This should typically be required if you are linking with users
  },
});

// Model declaration
const course =
  mongoose.models.course || mongoose.model<Course>("course", courseSchema);

export default course;
