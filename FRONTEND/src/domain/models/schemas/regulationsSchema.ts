import { z } from "zod";

export const regulationSchemaId = z.string().uuid();

// Crear normativa (campos requeridos)
export const regulationSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  version: z.string().min(1, "La versión es requerida"),
});

// Actualizar normativa (mismos campos requeridos)
export const regulationUpdateSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  version: z.string().min(1, "La versión es requerida"),
});
