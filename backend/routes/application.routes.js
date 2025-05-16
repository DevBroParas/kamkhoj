import express from "express";
import upload from "../middleware/upload.middleware.js";

import { protect, authorizeRoles } from "../middleware/auth.middleware.js";
import {
  ApplyToJob,
  GetApplicantsForJob,
  GetUserApplications,
} from "../controller/app.controller.js";

const router = express.Router();

router.post(
  "/:jobId",
  protect,
  authorizeRoles("student"),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  ApplyToJob
);
router.get("/user", protect, GetUserApplications);

router.get(
  "/job/:jobId/applicants",
  protect,
  authorizeRoles("recruiter"),
  GetApplicantsForJob
);

export default router;
