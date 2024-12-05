import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: string;
  date: Date;
  isAdmin: boolean;
  image: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String },
  date: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  image: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png",
  },
});

// Debug log to ensure mongoose models are available
console.log("Existing Mongoose Models:", mongoose.models);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
