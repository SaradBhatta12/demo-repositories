import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  profile: string;
  date: Date;
}

const userSchema = new Schema<IUser>({
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

const user = mongoose.models.user || mongoose.model("user", userSchema);
export default user;
