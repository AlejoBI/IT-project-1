import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import auditRoutes from "./routes/auditRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.AUDIT_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Audit service running");
});

app.use("/api/audit", auditRoutes);

app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () =>
  console.log(`Audit service running on http://localhost:${PORT}`)
);
