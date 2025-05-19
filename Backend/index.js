import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import captionRouter from "./routes/caption.route.js";
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/v1/user", userRouter);
app.use('/api/v1/caption', captionRouter);
connectDB();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The Server is listen on PORT ${PORT}`);
});
