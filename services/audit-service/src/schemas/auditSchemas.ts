import { z } from "zod";

export const sectionAuditSchema = z.object({
  sectionId: z.string(),
  sectionTitle: z.string(),
  status: z.enum(["Cumple", "No cumple", "Parcialmente cumple"]),
  observation: z.string().max(1000).optional(),
});

export const auditSchema = z.object({
  selfAssessmentId: z.string(),
  formVersion: z.number().int().positive().optional(),
  auditorId: z.string(),
  auditorName: z.string(),
  sectionAudit: sectionAuditSchema, // solo 1 sección a la vez
});
