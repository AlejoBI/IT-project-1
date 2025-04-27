import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRegulation, getRegulations, updateRegulation } from "../../../infrastructure/api/regulationsApi";
import {
  validateRegulationData,
  validateUid,
} from "../../../domain/services/regulationsService";

import { Regulation } from "../../../domain/models/types/regulationsTypes";

// Obtener datos de todos las regulaciones desde Firestore
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

// Obtener datos de una regulacion desde Firestore
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
    const user = await getRegulation(validation.data!);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Actualizar datos de una regulacion en Firestore
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
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar la regulación"
      );
    }
  }
);
