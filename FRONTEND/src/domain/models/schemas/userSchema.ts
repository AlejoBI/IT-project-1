import { z } from "zod";

export const userSchema = z.string().uuid();

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .optional(),
  role: z
    .enum(["standard_user", "auditor", "admin"], {
      errorMap: () => ({ message: "Rol no válido" }),
    })
    .optional(),
});