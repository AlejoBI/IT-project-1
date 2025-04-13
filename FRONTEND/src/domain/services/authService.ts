import {
  loginSchema,
  registerSchema,
  LoginPayload,
  RegisterPayload,
} from "../models/authSchema";

export function validateRegisterData(data: unknown): {
  success: boolean;
  data?: RegisterPayload;
  errors?: string[];
} {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(
      (err) => `${err.path[0]}: ${err.message}`
    );
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

export function validateLoginData(data: unknown): {
  success: boolean;
  data?: LoginPayload;
  errors?: string[];
} {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(
      (err) => `${err.path[0]}: ${err.message}`
    );
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}
