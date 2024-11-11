import mongoose, { Document, Schema } from "mongoose";

//main foucus is here

interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  faculty: string;
  courses: mongoose.Schema.Types.ObjectId[];
  subjects: mongoose.Schema.Types.ObjectId[];
  image: string;
  semester: number;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    faculty: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    image: { type: String, required: true },
    semester: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
