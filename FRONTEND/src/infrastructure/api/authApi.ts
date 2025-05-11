import api from "./axios";

export const registerApi = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

export const loginApi = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

export const logoutApi = async () => {
  await api.post("/api/auth/logout");
  return true;
};

export const recoverPasswordApi = async (email: string) => {
  const response = await api.post("/api/auth/recover-password", { email });
  return response.data;
};
