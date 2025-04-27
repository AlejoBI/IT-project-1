import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEvaluationFormApi,
  deleteEvaluationFormApi,
} from "../../../infrastructure/api/EvaluationFormApi";
import { validateRegisterData } from "../../../domain/services/evaluationFormService";
import { Form } from "../../../domain/models/types/EvaluationFormTypes";

export const createEvaluationForm = createAsyncThunk<
  Form,
  Form,
  { rejectValue: string | string[] }
>("evaluationForm/createForm", async (formData, { rejectWithValue }) => {
  const validation = validateRegisterData(formData);
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

export const deleteEvaluationForm = createAsyncThunk<
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
