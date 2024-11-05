import mongoose, { Schema } from "mongoose";

interface Schedule {
  title: string;
  description: string;
  date: Date;
  location: string;
  startTime: string;
  endTime: string;
  teacher: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
}

const ScheduleSchema = new Schema<Schedule>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  {
    timestamps: true,
  }
);

const Schedule =
  mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
