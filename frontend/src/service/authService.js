import API from "./api";

export const register = (data) =>
  API.post("api/user/register", data, { withCredentials: true });

export const login = (data) =>
  API.post("api/user/login", data, { withCredentials: true });

export const logout = () =>
  API.get("api/user/logout", { withCredentials: true });

export const me = () => API.get("api/user/me", { withCredentials: true });
