import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSelfAssessmentApi,
  saveSelfAssessmentApi,
  completeSelfAssessmentApi,
} from "../../../infrastructure/api/complianceApi";
import { validateClient } from "../../../shared/zodUtils";
import {
  SaveDraftPayload,
  SubmitSelfAssessmentRequest,
  GetDraftRequest,
  GetDraftResponse,
} from "../../../domain/models/types/complianceTypes";
import {
  SaveDraftSchema,
  SubmitAssessmentSchema,
} from "../../../domain/models/schemas/complianceSchema";

export const fetchSelfAssessment = createAsyncThunk<
  GetDraftResponse,
  GetDraftRequest,
  { rejectValue: string }
>("compliance/fetchSelfAssessment", async (data, { rejectWithValue }) => {
  try {
    const response = await fetchSelfAssessmentApi(data);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const saveSelfAssessmentDraft = createAsyncThunk<
  string,
  SaveDraftPayload,
  { rejectValue: string | string[] }
>(
  "compliance/saveSelfAssessmentDraft",
  async (payload, { rejectWithValue }) => {
    const validation = validateClient(SaveDraftSchema, payload);

    if (!validation.success) {
      return rejectWithValue(validation.error ?? "Datos inválidos");
    }

    if (!validation.data) {
      throw new Error("Información inválida");
    }

    try {
      const saved = await saveSelfAssessmentApi(validation.data);
      return saved;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const completeSelfAssessment = createAsyncThunk<
  string,
  SubmitSelfAssessmentRequest,
  { rejectValue: string }
>("compliance/completeSelfAssessment", async (payload, { rejectWithValue }) => {
  const validation = validateClient(SubmitAssessmentSchema, payload);

  if (!validation.success) {
    return rejectWithValue(validation.error ?? "Datos inválidos");
  }

  try {
    const result = await completeSelfAssessmentApi(payload);
    return result;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
