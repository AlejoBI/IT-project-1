import { Request, Response } from "express";
import { sendEmail } from "../service/notificationService.js";

interface NotificationBody {
  to?: string;
  subject?: string;
  htmlContent?: string;
  textContent?: string;
}

export class NotificationController {
  public async sendNotification(req: Request, res: Response): Promise<void> {
    const { to, subject, htmlContent, textContent } = req.body as NotificationBody;

    if (!to || !subject || (!htmlContent && !textContent)) {
      res.status(400).json({ error: "Faltan campos requeridos" });
      return;
    }

    try {
      await sendEmail(to, subject, htmlContent || "", textContent || "");
      res.status(200).json({ message: "Correo electrónico enviado exitosamente" });
    } catch {
      res.status(500).json({ error: "Error al enviar el correo electrónico" });
    }
  }
}
