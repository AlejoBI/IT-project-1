import {
  userUpdateSchema,
  userSchema,
  UserUpdatePayload,
} from "../models/userSchema";

export const validateUid = (
  uid: unknown
): {
  success: boolean;
  data?: string;
  errors?: string[];
} => {
  const result = userSchema.safeParse(uid);
  if (!result.success) {
    const errors = result.error.errors.map(
      (err) => `${err.path[0] ?? "uid"}: ${err.message}`
    );
    return { success: false, errors };
  }
  return { success: true, data: result.data };
};

export function validateUserData(data: unknown): {
  success: boolean;
  data?: UserUpdatePayload;
  errors?: string[];
} {
  const result = userUpdateSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(
      (err) => `${err.path[0]}: ${err.message}`
    );
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}
