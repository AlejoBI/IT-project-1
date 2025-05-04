import { ZodSchema } from "zod";

export const validateClient = <T>(schema: ZodSchema<T>, payload: unknown) => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    const message = result.error.errors[0]?.message || "Datos inválidos";
    return { success: false, error: message };
  }

  return { success: true, data: result.data as T };
};
