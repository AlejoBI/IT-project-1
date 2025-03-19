import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.AUTH_PORT;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://yourvercelapp.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Auth service running on http://localhost:${PORT}`)
);
