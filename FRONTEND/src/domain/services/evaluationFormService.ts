import { parseZodResult } from "../../shared/zodUtils";
import { formSchema, formSchemaId } from "../models/schemas/evaluationFormSchema";
import { FormPayload } from "../models/types/EvaluationFormTypes";

export function validateUid(uid: unknown) {
  return parseZodResult<string>(formSchemaId, uid);
}

export function validateFormData(data: unknown) {
  return parseZodResult<FormPayload>(formSchema, data);
}