import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEvaluationFormApi,
  deleteEvaluationFormApi,
  getEvaluationFormsApi,
  updateEvaluationFormApi,
} from "../../../infrastructure/api/EvaluationFormApi";
import { validateFormData } from "../../../domain/services/evaluationFormService";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";

export const createEvaluationFormAction = createAsyncThunk<
  Form,
  Form,
  { rejectValue: string | string[] }
>("evaluationForm/createForm", async (formData, { rejectWithValue }) => {
  const validation = validateFormData(formData);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "Datos inválidos");
  }
  try {
    const response = await createEvaluationFormApi(formData);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteEvaluationFormAction = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("evaluationForm/deleteForm", async (regulationId, { rejectWithValue }) => {
  try {
    const response = await deleteEvaluationFormApi(regulationId);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Obtener todas los formularios de evaluación
export const fetchEvaluationFormsAction = createAsyncThunk(
  "evaluationForm/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const forms = await getEvaluationFormsApi();
      return forms;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateEvaluationFormAction = createAsyncThunk(
  "evaluationForm/update",
  async (
    { uid, updates }: { uid: string; updates: Partial<Form> },
    { rejectWithValue }
  ) => {
    const validation = validateFormData(updates);
    if (!validation.success) {
      return rejectWithValue(validation.errors ?? "Datos inválidos");
    }

    try {
      await updateEvaluationFormApi(uid, updates);
      return { uid, updates };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
