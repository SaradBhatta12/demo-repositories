import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  profile: string;
  date: Date;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now, // Should be a function: Date.now()
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
