import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "El nombre de usuario es obligatorio"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Contraseña muy corta"),
});