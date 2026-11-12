import axios from "axios";
import { auth } from "./firebaseConfig";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:80";

const api = axios.create({
  baseURL: API_URL, // Todas las peticiones pasan por el API Gateway
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
