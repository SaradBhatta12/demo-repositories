import mongoose, { Schema } from "mongoose";

// Define the Teacher interface
interface Teacher {
  name: string;
  age: number;
  qualification: string;
  module: string;
  email: string;
  password: string;
}

// Define the teacher schema
const TeacherSchema = new Schema<Teacher>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    qualification: { type: String },
    module: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Model declaration
const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

export default Teacher;
