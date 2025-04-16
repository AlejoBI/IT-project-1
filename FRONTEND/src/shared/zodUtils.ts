import { ZodSchema } from "zod";

function parseZodResult<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: boolean; data?: T; errors?: string[] } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(
      (err) => `${err.path[0]}: ${err.message}`
    );
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

export { parseZodResult };
export type { ZodSchema };