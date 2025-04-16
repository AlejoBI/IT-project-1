import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
  emailVerified: z.boolean(),
});


export const userUpdateSchema = z.object({
  email: z.string().email().nullable().optional(),
  role: z.string().min(3).optional(),
});

export type UserUpdatePayload = z.infer<typeof userUpdateSchema>;
