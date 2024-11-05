import mongoose, { Document, Schema } from "mongoose";

interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  faculty: string;
  courses: mongoose.Schema.Types.ObjectId[];
  image: string;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    faculty: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
