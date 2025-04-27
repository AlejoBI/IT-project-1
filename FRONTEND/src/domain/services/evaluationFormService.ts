import { parseZodResult } from "../../shared/zodUtils";
import { formSchema } from "../models/schemas/evaluationFormSchema";
import { FormPayload } from "../models/types/EvaluationFormTypes";

export function validateRegisterData(data: unknown) {
  return parseZodResult<FormPayload>(formSchema, data);
}