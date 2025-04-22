import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.EVALUATION_FORM_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", router);

app.listen(PORT, () =>
  console.log(`Evaluation service running on http://localhost:${PORT}`)
);
