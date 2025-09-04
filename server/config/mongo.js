import mongoose from "mongoose";



export const mongoConnect = async () => {
  try {
    console.log("url is ");
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    console.log("some error occured")
    console.log("and the error is ",error);
    throw error;
  }
};