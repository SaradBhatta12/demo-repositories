import mongoose from "mongoose";

interface IAssignment {
  title: string;
  description: string;
  provideDate: Date;
  submitDate: Date;
  completed: boolean;
  student: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
}

const assignmentSchema = new mongoose.Schema<IAssignment>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    provideDate: { type: Date, required: true },
    submitDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  },
  {
    timestamps: true,
  }
);

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", assignmentSchema);
export default Assignment;
