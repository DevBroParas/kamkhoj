import express from "express";
import { Login, Logout, Me, Register } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/logout", Logout);

router.get("/me", protect, Me);

export default router;
