import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: string;
  date: Date;
  isAdmin: boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String },
  date: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

// Check if model exists before defining
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
