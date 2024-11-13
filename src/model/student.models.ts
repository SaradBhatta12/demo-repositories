import mongoose, { Document, Schema } from "mongoose";

//main foucus is here

interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  faculty: string;
  Profile: mongoose.Schema.Types.ObjectId;
  profile: mongoose.Schema.Types.ObjectId[];
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
    profile: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    Profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
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
