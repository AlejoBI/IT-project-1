import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import auditRoutes from "./routes/auditRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.AUTH_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/audit", auditRoutes);

app.listen(PORT, () =>
  console.log(`Audit service running on http://localhost:${PORT}`)
);
