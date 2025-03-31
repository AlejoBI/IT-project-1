import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80", // Todas las peticiones pasan por el API Gateway
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
