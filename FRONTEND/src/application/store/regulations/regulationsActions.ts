import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createRegulationApi,
  getRegulation,
  getRegulations,
  updateRegulation,
  deleteRegulation
} from "../../../infrastructure/api/regulationsApi";
import {
  validateRegulationData,
  validateUid,
} from "../../../domain/services/regulationsService";
import { Regulation } from "../../../domain/models/types/regulationsTypes";

// Crear una regulación en Firestore
export const createRegulationAction = createAsyncThunk<
  Regulation,
  Regulation,
  { rejectValue: string | string[] }
>("regulation/create", async (regulationData, { rejectWithValue }) => {
  const validation = validateRegulationData(regulationData);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "Datos inválidos");
  }
  try {
    const response = await createRegulationApi(regulationData);
    return response;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Obtener todas las regulaciones
export const fetchRegulationsAction = createAsyncThunk(
  "regulations/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const regulations = await getRegulations();
      return regulations;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Obtener una regulación por su ID
export const fetchRegulationAction = createAsyncThunk<
  Regulation,
  string,
  { rejectValue: string | string[] }
>("regulation/fetch", async (uid, { rejectWithValue }) => {
  const validation = validateUid(uid);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "UID inválido");
  }

  try {
    const regulation = await getRegulation(uid);
    if (!regulation) throw new Error("Regulación no encontrada");
    return regulation;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Actualizar datos de una regulación en Firestore
export const updateRegulationAction = createAsyncThunk(
  "regulation/update",
  async (
    { uid, updates }: { uid: string; updates: Partial<Regulation> },
    { rejectWithValue }
  ) => {
    const validation = validateRegulationData(updates);
    if (!validation.success) {
      return rejectWithValue(validation.errors ?? "Datos inválidos");
    }

    try {
      await updateRegulation(uid, updates);
      return { uid, updates };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Eliminar una regulación por su ID
export const deleteRegulationAction = createAsyncThunk(
  "regulation/delete",
  async (uid: string, { rejectWithValue }) => {

    try {
      await deleteRegulation(uid);
      return uid;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);