import mongoose from "mongoose";

interface PROFILE {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId[];
}

const ProfileSchema = new mongoose.Schema<PROFILE>(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    subject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile =
  mongoose.models.Profile || mongoose.model<PROFILE>("Profile", ProfileSchema);
export default Profile;
