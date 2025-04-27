import { z } from "zod";

export const userSchema = z.string().uuid();

export const userUpdateSchema = z.object({
  email: z.string().email().nullable().optional(),
  role: z.enum(["admin", "standard_user", "auditor"]).optional(),
});