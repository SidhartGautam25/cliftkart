import app from "./app.js";
import { mongoConnect } from "./config/mongo.js";
import mongoose from "mongoose";
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from "razorpay";


mongoConnect();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down due to uncaught exception errors`);
  process.exit(1);
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// starting payment things
// export const instance=new Razorpay({
//   key_id:'',
//   key_secret:''
// })

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down, due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
