import mongoose from "mongoose";
const connectDB = async () => {
  console.log(process.env.MONGO_URL);
  try {
    const connect = await mongoose
      .connect(process.env.MONGO_URL!, { dbName: "divyaGyan" })
      .then(() => {
        console.log("connected to database");
      })
      .catch((error) => {
        console.log(error, "error connecting to database");
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
