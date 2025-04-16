import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserProfiles,
  getUserProfile,
  updateUserProfile,
} from "../../../infrastructure/api/usersApi";
import {
  validateUserData,
  validateUid,
} from "../../../domain/services/userService";

import { User } from "../../../domain/models/types";

// Obtener datos de todos los usuarios desde Firestore
export const fetchUsersAction = createAsyncThunk(
  "users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUserProfiles();
      return users;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Obtener datos de un usuario desde Firestore
export const fetchUserAction = createAsyncThunk<
  User,
  string,
  { rejectValue: string | string[] }
>("user/fetch", async (uid, { rejectWithValue }) => {
  const validation = validateUid(uid);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "UID inválido");
  }

  try {
    const user = await getUserProfile(validation.data!);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Actualizar datos de un usuario en Firestore
export const updateUserAction = createAsyncThunk(
  "user/update",
  async (
    { uid, updates }: { uid: string; updates: Partial<User> },
    { rejectWithValue }
  ) => {
    const validation = validateUserData(updates);
    if (!validation.success) {
      return rejectWithValue(validation.errors ?? "Datos inválidos");
    }

    try {
      await updateUserProfile(uid, updates);
      return { uid, updates };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
