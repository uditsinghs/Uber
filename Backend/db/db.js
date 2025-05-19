import mongoose from "mongoose";
export const connectDB = async () => {
  const URL = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
