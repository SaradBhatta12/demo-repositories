import mongoose, { Document, Schema } from "mongoose";

//main foucus is here

interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  Profile: mongoose.Schema.Types.ObjectId;
  Course: mongoose.Schema.Types.ObjectId;
  image: string;
  semester: number;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    Course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
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
