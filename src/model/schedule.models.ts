import mongoose, { Schema } from "mongoose";

interface Schedule {
  title: string;
  description: string;
  date: Date;
  location: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  teacher: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
}

const scheduleSchema = new Schema<Schedule>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "teacher", required: true },
    course: { type: Schema.Types.ObjectId, ref: "course", required: true },
  },
  {
    timestamps: true,
  }
);

const schedule =
  mongoose.models.schedule || mongoose.model("schedule", scheduleSchema);

export default schedule;
