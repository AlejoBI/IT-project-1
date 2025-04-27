import { z } from "zod";

export const complianceSchema = z.object({
  responses: z.record(z.string(), z.enum(["si", "no", "parcial"])),
});

export type CompliancePayload = z.infer<typeof complianceSchema>;