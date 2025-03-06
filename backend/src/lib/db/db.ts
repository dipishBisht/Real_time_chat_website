import mongoose from "mongoose";

export async function connectToDB() {
  const url = process.env.MONGO_URI_LOCAL;
  if (!url) return "No URL found";
  try {
    await mongoose.connect(url);
    console.log("Connected to db");
  } catch (error) {
    console.log("Connection error: ", error);
  }
}
