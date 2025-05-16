import { api } from "./Api";

export const ApplyToJobApi = async (jobId, data) =>
  await api.post(`/api/applications/${jobId}`, data, { withCredentials: true });

export const GetUserApplicationsApi = async () =>
  await api.get("/api/applications/user", { withCredentials: true });

export const GetApplicantsForJobApi = async (jobId) =>
  await api.get(`/api/applications/job/${jobId}/applicants`, { withCredentials: true });