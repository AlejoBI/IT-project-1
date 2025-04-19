import { z } from "zod";
import { UserRole } from "../models/userModel.js";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .optional(),
  role: z
    .enum([UserRole.ADMIN, UserRole.AUDITOR, UserRole.STANDARD_USER], {
      errorMap: () => ({ message: "Rol no válido" }),
    })
    .optional(),
});
