import { parseZodResult } from "../../shared/zodUtils";
import { registerSchema, loginSchema } from "../models/schemas/authSchema";
import { RegisterPayload, LoginPayload } from "../models/types/authTypes";

export function validateRegisterData(data: unknown) {
  return parseZodResult<RegisterPayload>(registerSchema, data);
}

export function validateLoginData(data: unknown) {
  return parseZodResult<LoginPayload>(loginSchema, data);
}
