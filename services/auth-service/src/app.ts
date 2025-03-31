import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.AUTH_PORT;

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Auth service running on http://localhost:${PORT}`)
);
