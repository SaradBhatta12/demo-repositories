import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to database...", process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL!, { dbName: "divyaGyan" });
    console.log("Connected to database successfully.");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export default connectDB;
