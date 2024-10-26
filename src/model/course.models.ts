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
  Student: mongoose.Types.ObjectId[];
}

// Define the course schema
const courseSchema: Schema = new Schema<Course>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    syllabus: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Reference to user or instructor
    Student: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }], // Reference to student
  },
  { timestamps: true }
);

// Model declaration
const course =
  mongoose.models.course || mongoose.model<Course>("course", courseSchema);

export default course;
