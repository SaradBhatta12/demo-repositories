import mongoose, { Schema } from "mongoose";

interface Teacher {
  name: string;
  age: number;
  qualification: string;
  module: string;
  email: string;
  password: string;
}

const teacherSchema = new Schema<Teacher>(
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

const teacher =
  mongoose.models.teacher || mongoose.model("teacher", teacherSchema);
export default teacher;
