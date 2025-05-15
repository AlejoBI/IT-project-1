import { z } from "zod";

export const AuditSchema = z.object({
  id: z.string(),
  userId: z.string(),
  action: z.string()
});
