import { z } from "zod";

// Registro
export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
  email: z.string().email("Correo inválido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .refine((val) => (val.match(/[A-Z]/g) || []).length >= 2, {
      message: "La contraseña debe contener al menos dos letras mayúsculas",
    })
    .refine((val) => (val.match(/[a-z]/g) || []).length >= 2, {
      message: "La contraseña debe contener al menos dos letras minúsculas",
    })
    .refine((val) => (val.match(/[0-9]/g) || []).length >= 2, {
      message: "La contraseña debe contener al menos dos números",
    })
    .refine((val) => (val.match(/[\W_]/g) || []).length >= 2, {
      message: "La contraseña debe contener al menos dos caracteres especiales",
    }),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
});

// Login
export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
