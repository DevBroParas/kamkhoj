import express from "express";

import { protect, authorizeRoles } from "../middleware/auth.middleware.js";
import {
  CreateJob,
  DeleteJob,
  GetAllJobs,
  GetAllUserJobs,
  GetSingleJob,
  UpdateJob,
} from "../controller/job.controller.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("recruiter"), CreateJob);

router.get("/all", protect, authorizeRoles("recruiter", "student"), GetAllJobs);

router.get("/", protect, authorizeRoles("recruiter"), GetAllUserJobs);

router.get(
  "/:jobId",
  protect,
  authorizeRoles("recruiter", "student"),
  GetSingleJob
);

router.put("/:jobId", protect, authorizeRoles("recruiter"), UpdateJob);
router.delete("/:jobId", protect, authorizeRoles("recruiter"), DeleteJob);

export default router;
