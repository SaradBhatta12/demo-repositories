import mongoose, { Document, Schema } from "mongoose";

// Define the Teacher interface extending Document for Mongoose methods
interface ITeacher extends Document {
  name: string;
  age?: number;
  qualification?: string;
  module?: string;
  email: string;
  password: string;
}

// Define the teacher schema
const TeacherSchema = new Schema<ITeacher>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, min: 0 }, // example validation for age
    qualification: { type: String },
    module: { type: String },
  },
  {
    timestamps: true,
  }
);

// Export the model
const Teacher =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;
