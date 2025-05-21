import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.NOTIFICATION_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/notifications", notificationRoutes);


app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});

export default app;
