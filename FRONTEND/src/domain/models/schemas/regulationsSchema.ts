import { z } from "zod";

export const regulationSchema = z.string().uuid();

export const regulationUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  version: z.string().optional(),
});
