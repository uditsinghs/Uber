import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.route.js";
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
connectDB();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The Server is listen on PORT ${PORT}`);
});
