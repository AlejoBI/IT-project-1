import express from "express";
import { NotificationController } from "../controllers/notificationController.js";
import { validate } from "../middlewares/validate.js";
import { notificationSchema } from "../schemas/notificationSchemas.js";

const router = express.Router();
const notificationController = new NotificationController();

router.post("/send", validate(notificationSchema), notificationController.sendNotification);

export default router;
