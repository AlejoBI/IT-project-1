import { z } from "zod";

export const userSchema = z.string().uuid();

export const userUpdateSchema = z.object({
  email: z.string().email().nullable().optional(),
  role: z.string().min(3).optional(),
});