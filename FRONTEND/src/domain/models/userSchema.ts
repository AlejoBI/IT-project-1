import { z } from "zod";

export const userSchema = z.string().min(1, "UID requerido");

export const userUpdateSchema = z.object({
  email: z.string().email().nullable().optional(),
  role: z.string().min(3).optional(),
});

export type UserUpdatePayload = z.infer<typeof userUpdateSchema>;
