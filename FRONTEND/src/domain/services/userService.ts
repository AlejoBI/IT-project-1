import { parseZodResult } from "../../shared/zodUtils";
import {
  userUpdateSchema,
  userSchema,
} from "../models/userSchema";
import { UserUpdatePayload } from "../models/types";

export function validateUid(data: unknown) {
  return parseZodResult<string>(userSchema, data);
}

export function validateUserData(data: unknown) {
  return parseZodResult<UserUpdatePayload>(userUpdateSchema, data);
}
