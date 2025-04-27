import { parseZodResult } from "../../shared/zodUtils";
import {
  regulationSchema,
  regulationUpdateSchema,
} from "../models/schemas/regulationsSchema";
import { RegulationUpdatePayload } from "../models/types/regulationsTypes";

export function validateUid(data: unknown) {
  return parseZodResult<string>(regulationSchema, data);
}

export function validateRegulationData(data: unknown) {
  return parseZodResult<RegulationUpdatePayload>(regulationUpdateSchema, data);
}