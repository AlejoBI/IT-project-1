import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  createRegulationApi,
  getRegulation,
  getRegulations,
  updateRegulation,
  deleteRegulation,
} from "../../../infrastructure/api/regulationsApi";
import {
  regulationSchemaId,
  regulationUpdateSchema,
} from "../../../domain/models/schemas/regulationsSchema";
import { Regulation } from "../../../domain/models/types/regulationsTypes";
import { validateClient } from "../../../shared/zodUtils";

// Crear una regulación en Firestore
export const createRegulationAction = createAsyncThunk<
  { message: string },
  Regulation,
  { rejectValue: { error: string | string[] } }
>("regulation/create", async (regulationData, { rejectWithValue }) => {
  const validation = validateClient(regulationUpdateSchema, regulationData);
  if (!validation.success) {
    return rejectWithValue({ error: validation.error ?? "Datos inválidos" });
  }
  try {
    const response = await createRegulationApi(regulationData);
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al crear la regulación";
    return rejectWithValue({ error: errorMessage });
  }
});

// Obtener todas las regulaciones
export const fetchRegulationsAction = createAsyncThunk(
  "regulations/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const regulations = await getRegulations();
      return regulations;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage = errorData?.error || "Error al obtener los usuarios";
      return rejectWithValue(errorMessage);
    }
  }
);

// Obtener una regulación por su ID
export const fetchRegulationAction = createAsyncThunk<
  Regulation,
  string,
  { rejectValue: string | string[] }
>("regulation/fetch", async (uid, { rejectWithValue }) => {
  const validation = validateClient(regulationSchemaId, uid);
  if (!validation.success) {
    return rejectWithValue(validation.error ?? "UID inválido");
  }

  try {
    const regulation = await getRegulation(uid);
    if (!regulation) throw new Error("Regulación no encontrada");
    return regulation;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al obtener los usuarios";
    return rejectWithValue(errorMessage);
  }
});

// Actualizar datos de una regulación en Firestore
export const updateRegulationAction = createAsyncThunk<
  { message: string },
  { uid: string; updates: Partial<Regulation> },
  { rejectValue: { error: string } }
>(
  "regulation/update",
  async (
    { uid, updates }: { uid: string; updates: Partial<Regulation> },
    { rejectWithValue }
  ) => {
    const validation = validateClient(regulationUpdateSchema, updates);
    if (!validation.success) {
      return rejectWithValue({ error: validation.error ?? "Datos inválidos" });
    }

    try {
      const response = await updateRegulation(uid, updates);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage = errorData?.error || "Error al obtener los usuarios";
      return rejectWithValue({ error: errorMessage });
    }
  }
);

// Eliminar una regulación por su ID
export const deleteRegulationAction = createAsyncThunk<
  { message: string; uid: string },
  string,
  { rejectValue: { error: string } }
>("regulation/delete", async (uid, { rejectWithValue }) => {
  try {
    await deleteRegulation(uid);
    return { message: "Regulación eliminada correctamente", uid };
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al eliminar la regulación";
    return rejectWithValue({ error: errorMessage });
  }
});
