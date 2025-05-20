import { Request, Response } from "express";
import { sendEmail } from "../service/notificationService.js";

export class NotificationController {
  public async sendNotification(req: Request, res: Response): Promise<void> {
    const { to, subject, htmlContent, textContent } = req.body;

    if (!to || !subject || (!htmlContent && !textContent)) {
      res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
      await sendEmail(to, subject, htmlContent || "", textContent || "");
      res
        .status(200)
        .json({ message: "Correo electrónico enviado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }
}
