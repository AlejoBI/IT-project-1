import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.USERS_PORT;

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Users service running on http://localhost:${PORT}`)
);
