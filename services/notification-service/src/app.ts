import express from "express";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.NOTIFICATION_PORT;

app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});

export default app;
