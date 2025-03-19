import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.USERS_PORT;

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
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Users service running on http://localhost:${PORT}`)
);
