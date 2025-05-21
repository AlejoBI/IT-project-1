import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:80"; 

const api = axios.create({
  baseURL: API_URL, // Todas las peticiones pasan por el API Gateway
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
