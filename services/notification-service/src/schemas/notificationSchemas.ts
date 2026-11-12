import { z } from "zod";

export const notificationSchema = z
  .object({
    to: z.string().email("Destinatario inválido"),
    subject: z.string().trim().min(1, "El asunto es obligatorio").max(200),
    htmlContent: z.string().optional(),
    textContent: z.string().optional(),
  })
  .refine((data) => Boolean(data.htmlContent?.trim() || data.textContent?.trim()), {
    message: "Debe incluir contenido HTML o texto",
    path: ["textContent"],
  });
