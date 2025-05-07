import express from "express";
import { Login, Logout, Me, Register } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), Register);

router.post("/login", Login);

router.get("/logout", Logout);

router.get("/me", protect, Me);

export default router;
