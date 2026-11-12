import api from "./axios";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerApi = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data.message;
};

export const loginApi = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/api/auth/login", credentials);
  await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  return response.data;
};

export const logoutApi = async () => {
  await Promise.allSettled([api.post("/api/auth/logout"), signOut(auth)]);
  return true;
};

export const recoverPasswordApi = async (email: string) => {
  const response = await api.post("/api/auth/recover-password", { email });
  return response.data;
};
