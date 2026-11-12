import { z } from "zod";

export const createReportActionSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().max(1000).optional(),
  responsible: z.string().trim().max(160).optional(),
  dueDate: z.string().datetime().optional(),
  status: z.enum(["pendiente", "en_progreso", "resuelta", "vencida"]).default("pendiente"),
});

export const updateReportActionSchema = createReportActionSchema.partial();
