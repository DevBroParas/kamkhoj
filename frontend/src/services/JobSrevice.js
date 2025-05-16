import { api } from "./Api";

// Get all jobs
export const getAllJobsApi = async () =>
  await api.get("/api/jobs/all", { withCredentials: true });

// Get only the jobs posted by the current recruiter
export const getMyJobsApi = async () =>
  await api.get("/api/jobs", { withCredentials: true }); // this route is correct now

// Get a single job (by ID)
export const getSingleJobApi = async (jobId) =>
  await api.get(`/api/jobs/${jobId}`, { withCredentials: true });

// Create a new job
export const createJobApi = async (data) =>
  await api.post("/api/jobs", data, { withCredentials: true });

// Update job
export const updateJobApi = async (jobId, data) =>
  await api.put(`/api/jobs/${jobId}`, data, { withCredentials: true });

// Delete job
export const deleteJobApi = async (jobId) =>
  await api.delete(`/api/jobs/${jobId}`, { withCredentials: true });
