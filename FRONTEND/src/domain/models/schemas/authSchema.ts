import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    email: z.string().email("Correo inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .refine((val) => (val.match(/[A-Z]/g) || []).length >= 1, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .refine((val) => (val.match(/[a-z]/g) || []).length >= 1, {
        message: "La contraseña debe contener al menos una letra minúscula",
      })
      .refine((val) => (val.match(/[0-9]/g) || []).length >= 1, {
        message: "La contraseña debe contener al menos 1 número",
      })
      .refine((val) => (val.match(/[\W_]/g) || []).length >= 1, {
        message: "La contraseña debe contener al menos 1 caracter especial",
      }),
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "La confirmación de contraseña es obligatoria"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], 
  });

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
