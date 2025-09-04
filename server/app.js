import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.js";
import userRoute from "./routes/userRoutes.js";
// import paymentRoute from "./routes/payment.js"
import productRoutes from "./routes/productRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, postman, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173', // Vite default
      'http://cliftkart.com',
      'http://www.cliftkart.com',
      'https://cliftkart.com',
      'https://www.cliftkart.com'
    ];

    // In development, allow any localhost port
    if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This is crucial for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['set-cookie']
};



app.use(cors(corsOptions));
dotenv.config();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("request is coming");
  console.log("request body is ", req.body);
  console.log("IP:", req.ip);
  console.log("Request Headers:", req.headers);
  if (req.method === "OPTIONS") {
    console.log("Preflight request received");
  }
  next();
});

app.use("/api/v1", userRoute);
app.use("/api/v1", productRoutes);
// app.use("/api/v1", paymentRoute);

app.use(errorMiddleware);

export default app;
