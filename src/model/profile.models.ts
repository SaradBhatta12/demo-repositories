import mongoose, { Document, Model } from "mongoose";

// Define the interface for the profile document, without Mongoose-specific types
interface IProfile extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
}

// Define the schema for the Profile model
const ProfileSchema = new mongoose.Schema<IProfile>(
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
  },
  {
    timestamps: true,
  }
);

// Define the model with TypeScript, ensuring type safety
const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
