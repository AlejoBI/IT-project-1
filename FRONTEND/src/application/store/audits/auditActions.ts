import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { createOrUpdateAuditApi, getSelfAssessmentToAuditsApi } from "../../../infrastructure/api/auditApi";
import { auditSchema } from "../../../domain/models/schemas/auditSchema";
import { SelfAssessmentToAudit } from "../../../domain/models/types/auditTypes";
import { Audit } from "../../../domain/models/types/auditTypes";
import { validateClient } from "../../../shared/zodUtils";

export const createOrUpdateAudit = createAsyncThunk<
  { message: string },
  Audit,
    { rejectValue: { error: string | string[] } }
>("audit/createOrUpdate", async (auditData, { rejectWithValue }) => {
    const validation = validateClient(auditSchema, auditData);
    if (!validation.success) {
        return rejectWithValue({ error: validation.error ?? "Datos inválidos" });
    }
    try {
        const response = await createOrUpdateAuditApi(auditData);
        return response;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data as { error: string };
        const errorMessage = errorData?.error || "Error al crear o actualizar la auditoría";
        return rejectWithValue({ error: errorMessage });
    }
    }
);

export const fetchSelfAssessmentToAudits = createAsyncThunk<
  SelfAssessmentToAudit[],
  string,
  { rejectValue: string }
>(
  "compliance/fetchSelfAssessmentToAudits",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getSelfAssessmentToAuditsApi(userId);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage = errorData?.error || "Error al obtener los reportes";
      return rejectWithValue(errorMessage);
    }
  }
);
