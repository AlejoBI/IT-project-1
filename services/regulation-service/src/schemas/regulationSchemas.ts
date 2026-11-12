import { z } from "zod";

// Crear normativa
export const addRegulationSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  version: z.string().min(1, "La versión es requerida"),
  effectiveFrom: z.string().datetime({ offset: true }).optional(),
  effectiveTo: z.string().datetime({ offset: true }).optional(),
}).refine(
  (data) => !data.effectiveFrom || !data.effectiveTo || data.effectiveFrom <= data.effectiveTo,
  { message: "La fecha de vigencia final debe ser posterior a la inicial", path: ["effectiveTo"] }
);

// Actualizar normativa (mismos campos requeridos)
export const updateRegulationSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  version: z.string().min(1, "La versión es requerida"),
  effectiveFrom: z.string().datetime({ offset: true }).optional(),
  effectiveTo: z.string().datetime({ offset: true }).optional(),
}).refine(
  (data) => !data.effectiveFrom || !data.effectiveTo || data.effectiveFrom <= data.effectiveTo,
  { message: "La fecha de vigencia final debe ser posterior a la inicial", path: ["effectiveTo"] }
);
