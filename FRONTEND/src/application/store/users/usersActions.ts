import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  getUserProfiles,
  getUserProfile,
  getUserProfilesWithEvaluationsAndAudits,
  updateUserProfile,
} from "../../../infrastructure/api/usersApi";
import { updateUserSchema } from "../../../domain/models/schemas/userSchema";
import { User } from "../../../domain/models/types/userTypes";
import { validateClient } from "../../../shared/zodUtils";

// Obtener datos de un usuario desde Firestore
export const fetchUserAction = createAsyncThunk<
  User,
  string,
  { rejectValue: string | string[] }
>("user/fetch", async (uid, { rejectWithValue }) => {
  try {
    const user = await getUserProfile(uid);
    return user;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al obtener el usuario";
    return rejectWithValue(errorMessage);
  }
});

// Obtener datos de todos los usuarios desde Firestore
export const fetchUsersAction = createAsyncThunk(
  "users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUserProfiles();
      return users;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage = errorData?.error || "Error al obtener los usuarios";
      return rejectWithValue(errorMessage);
    }
  }
);

// Obtener datos de todos los usuarios con Evaluaciones y Auditorías desde Firestore
export const fetchUsersWithEvaluationsAndAuditsAction = createAsyncThunk(
  "users/fetchWithEvaluationsAndAudits",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUserProfilesWithEvaluationsAndAudits();
      return users;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage =
        errorData?.error || "Error al obtener los usuarios con auditorías";
      return rejectWithValue(errorMessage);
    }
  }
);


// Actualizar datos de un usuario en Firestore
export const updateUserAction = createAsyncThunk<
  { message: string },
  { uid: string; updates: Partial<User> },
  { rejectValue: { error: string } }
>(
  "user/update",
  async (
    { uid, updates }: { uid: string; updates: Partial<User> },
    { rejectWithValue }
  ) => {
    const validation = validateClient(updateUserSchema, updates);
    if (!validation.success) {
      return rejectWithValue({ error: validation.error ?? "Datos inválidos" });
    }

    try {
      const response = await updateUserProfile(uid, updates);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as { error: string };
      const errorMessage = errorData?.error || "Error al actualizar el usuario";
      return rejectWithValue({ error: errorMessage });
    }
  }
);
