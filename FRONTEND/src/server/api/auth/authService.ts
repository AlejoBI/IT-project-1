import api from "../axios";

export const registerService = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

export const loginService = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

export const logoutService = async () => {
  try {
    await api.post("/api/auth/logout");
    return true;
  } catch (error: unknown) {
    console.log(error);
  }
};
