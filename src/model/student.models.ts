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
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const student =
  mongoose.models.student || mongoose.model<IStudent>("student", StudentSchema);

export default student;
