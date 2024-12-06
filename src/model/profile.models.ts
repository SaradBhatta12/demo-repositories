import mongoose, { Schema } from "mongoose";

interface ProfileI {
  student: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
}

const ProfileSchema = new Schema<ProfileI>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;
