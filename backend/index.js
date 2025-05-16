// server.js (or app.js)
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/Db.js";

// ─── NEW: import path & URL helpers ─────────────────────────────────────────
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// ─── NEW: derive __dirname in ES module ────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// ─── THIS NOW WORKS: serve your uploads folder ───────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});
