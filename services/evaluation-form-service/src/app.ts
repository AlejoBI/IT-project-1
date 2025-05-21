import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.EVALUATION_FORM_PORT;

app.use(express.json({ 
  limit: "10mb",
}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Evaluation Form service running");
});

app.use("/api/evaluation", router);

app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () =>
  console.log(`Evaluation service running on http://localhost:${PORT}`)
);
