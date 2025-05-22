import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.USERS_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Users service running");
});

app.use("/api/users", userRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'user-service' });
});

app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () =>
  console.log(`Users service running on http://localhost:${PORT}`)
);
