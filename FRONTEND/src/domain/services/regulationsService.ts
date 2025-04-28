import { parseZodResult } from "../../shared/zodUtils";
import {
  regulationSchemaId,
  regulationUpdateSchema,
} from "../models/schemas/regulationsSchema";
import { RegulationUpdatePayload } from "../models/types/regulationsTypes";

export function validateUid(uid: unknown) {
  return parseZodResult<string>(regulationSchemaId, uid);
}

export function validateRegulationData(data: unknown) {
  return parseZodResult<RegulationUpdatePayload>(regulationUpdateSchema, data);
}