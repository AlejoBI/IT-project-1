import { parseZodResult } from "../../shared/zodUtils";
import {
  userUpdateSchema,
} from "../models/schemas/userSchema";
import { UserUpdatePayload } from "../models/types/userTypes";

export function validateUserData(data: unknown) {
  return parseZodResult<UserUpdatePayload>(userUpdateSchema, data);
}
