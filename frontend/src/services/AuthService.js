import { api } from "./Api";

export const registerApi = async (data) =>
  await api.post("/api/users/register", data, { withCredentials: true });

export const loginApi = async (data) =>
  await api.post("/api/users/login", data, { withCredentials: true });

export const logoutApi = async () =>
  await api.get("/api/users/logout", { withCredentials: true });

export const meApi = async () =>
  await api.get("/api/users/me", { withCredentials: true });
