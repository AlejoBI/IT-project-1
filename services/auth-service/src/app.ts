import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.AUTH_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Auth service running on http://localhost:${PORT}`)
);
