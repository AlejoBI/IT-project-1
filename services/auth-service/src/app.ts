import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.AUTH_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Auth service running");
});

app.use("/api/auth", authRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'auth-service' });
});

app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () =>
  console.log(`Auth service running on http://localhost:${PORT}`)
);
