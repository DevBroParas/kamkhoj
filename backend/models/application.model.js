import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  resume: String,
  coverLetter: String,
  status: {
    type: String,
    enum: ["applied", "reviewed", "interview", "rejected", "accepted"],
    default: "applied",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Application", ApplicationSchema);