import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

const app = express();
dotenv.config();

//create connection to mongo
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

app.use(express.json());
app.use(cookieParser())
app.use(cors());

//middlewares
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

//middleware Error
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "something went wrong"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })
})

app.listen(8000, () => {
  connect();
  console.log("Connected to backend");
});
