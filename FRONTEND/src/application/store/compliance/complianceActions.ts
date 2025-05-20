import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSelfAssessmentApi,
  saveSelfAssessmentApi,
  completeSelfAssessmentApi,
  getComplianceReportsApi,
  getSelfAssessmentReportApi,
  getSelfAssessmentByAssessmentId,
} from "../../../infrastructure/api/complianceApi";
import { validateClient } from "../../../shared/zodUtils";
import {
  SaveDraftPayload,
  SubmitSelfAssessmentRequest,
  GetDraftRequest,
  GetDraftResponse,
  ComplianceReport,
  SelfAssessmentReport,
} from "../../../domain/models/types/complianceTypes";
import { SelfAssessmentToAudit } from "../../../domain/models/types/auditTypes";
import {
  SaveDraftSchema,
  SubmitAssessmentSchema,
} from "../../../domain/models/schemas/complianceSchema";
import { AxiosError } from "axios";

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
      throw new Error("Validación fallida");
    }

    try {
      const saved = await saveSelfAssessmentApi(validation.data);
      return saved.message;
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
    return result.message;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Obtener los reportes de cumplimiento
export const fetchComplianceReports = createAsyncThunk<
  ComplianceReport[],
  string,
  { rejectValue: string }
>("compliance/fetchComplianceReports", async (userId, { rejectWithValue }) => {
  try {
    const response = await getComplianceReportsApi(userId);
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al obtener los reportes";
    return rejectWithValue(errorMessage);
  }
});

export const fetchSelfAssessmentReport = createAsyncThunk<
  SelfAssessmentReport[],
  string,
  { rejectValue: string }
>(
  "compliance/fetchSelfAssessmentReport",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getSelfAssessmentReportApi(userId);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage = errorData?.error || "Error al obtener los reportes";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSelfAssessmentByAssessmentId = createAsyncThunk<
  SelfAssessmentToAudit,
  string,
  { rejectValue: string }
>(
  "compliance/fetchSelfAssessmentByAssessmentId",
  async (selfAssessmentId, { rejectWithValue }) => {
    try {
      const response = await getSelfAssessmentByAssessmentId(selfAssessmentId);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage =
        errorData?.error || "Error al obtener los resultados";
      return rejectWithValue(errorMessage);
    }
  }
);
