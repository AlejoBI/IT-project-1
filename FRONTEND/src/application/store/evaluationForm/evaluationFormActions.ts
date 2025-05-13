import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  createEvaluationFormApi,
  deleteEvaluationFormApi,
  getEvaluationFormsApi,
  getEvaluationFormById,
  updateEvaluationFormApi,
} from "../../../infrastructure/api/EvaluationFormApi";
import { Form, FormGetResponse } from "../../../domain/models/types/EvaluationFormTypes";
import { validateClient } from "../../../shared/zodUtils";
import { formSchema } from "../../../domain/models/schemas/evaluationFormSchema";

export const createEvaluationFormAction = createAsyncThunk<
  { message: string },
  Form,
  { rejectValue: { error: string | string[] } }
>("evaluationForm/createForm", async (formData, { rejectWithValue }) => {
  const validation = validateClient(formSchema, formData);
  if (!validation.success) {
    return rejectWithValue({ error: validation.error ?? "Datos inválidos" });
  }
  try {
    const response = await createEvaluationFormApi(formData);
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error;
    return rejectWithValue({ error: errorMessage });
  }
});

// Obtener todas los formularios de evaluación
export const fetchEvaluationFormsAction = createAsyncThunk(
  "evaluationForm/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const forms = await getEvaluationFormsApi();
      return forms;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage =
        errorData?.error || "Error al obtener los formularios";
      return rejectWithValue(errorMessage);
    }
  }
);

// Obtener un formulario de evaluación por ID
export const fetchEvaluationFormByIdAction = createAsyncThunk<
  FormGetResponse,
  string,
  { rejectValue: string }
>("evaluationForm/fetchById", async (uid, { rejectWithValue }) => {
  try {
    const form = await getEvaluationFormById(uid);
    return form;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al obtener el formulario";
    return rejectWithValue(errorMessage);
  }
});

export const updateEvaluationFormAction = createAsyncThunk<
  { message: string },
  { uid: string; updates: Partial<Form> },
  { rejectValue: { error: string } }
>(
  "evaluationForm/update",
  async (
    { uid, updates }: { uid: string; updates: Partial<Form> },
    { rejectWithValue }
  ) => {
    const validation = validateClient(formSchema, updates);
    if (!validation.success) {
      return rejectWithValue({ error: validation.error ?? "Datos inválidos" });
    }

    try {
      const response = await updateEvaluationFormApi(uid, updates);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage =
        errorData?.error || "Error al actualizar el formulario";
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const deleteEvaluationFormAction = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: { error: string } }
>("evaluationForm/deleteForm", async (regulationId, { rejectWithValue }) => {
  try {
    const response = await deleteEvaluationFormApi(regulationId);
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al eliminar el formulario";
    return rejectWithValue({ error: errorMessage });
  }
});
