import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/Db.js";
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import userRoutes from "./routes/user.routes.js";

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
