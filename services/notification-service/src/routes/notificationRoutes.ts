import express from 'express';
import { NotificationController } from '../controllers/notificationController.js';

const router = express.Router();
const notificationController = new NotificationController();

router.post('/send', notificationController.sendNotification);

export default router;