import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  registerApi,
  logoutApi,
} from "../../../infrastructure/api/authApi";

import {
  validateLoginData,
  validateRegisterData,
} from "../../../domain/services/authService";

import { AuthUser } from "../../../domain/models/types/authTypes";

export const registerUser = createAsyncThunk<
  AuthUser,
  { username: string; email: string; password: string },
  { rejectValue: string | string[] }
>("auth/register", async (payload, { rejectWithValue }) => {
  const validation = validateRegisterData(payload);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "Datos inválidos");
  }

  try {
    const authUser = await registerApi(validation.data!);

    return {
      uid: authUser.uid,
      username: authUser.username || payload.username,
      name: authUser.name || null,
      role: authUser.role || null,
      email: authUser.email || null,
      emailVerified: authUser.emailVerified,
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginUser = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string | string[] }
>("auth/login", async (payload, { rejectWithValue }) => {
  const validation = validateLoginData(payload);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "Datos inválidos");
  }

  try {
    const authUser = await loginApi(validation.data!);
    return authUser;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
