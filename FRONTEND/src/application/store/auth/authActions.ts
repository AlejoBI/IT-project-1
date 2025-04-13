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

interface AuthUser {
  uid: string;
  name: string | null;
  email: string | null;
  emailVerified: boolean;
}

export const registerUser = createAsyncThunk<
  AuthUser,
  {
    username: string;
    email: string;
    password: string;
  },
  { rejectValue: string | string[] }
>("auth/register", async (payload, { rejectWithValue }) => {
  const validation = validateRegisterData(payload);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "Datos inválidos");
  }
  try {
    if (!validation.data) {
      throw new Error("Validation data is undefined");
    }
    const authUser = await registerApi(validation.data);

    const userData = {
      uid: authUser.uid,
      name: authUser.name || payload.username,
      email: authUser.email || null,
      emailVerified: authUser.emailVerified,
    };

    return userData;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginUser = createAsyncThunk<
  AuthUser, // Tipo de dato que retorna
  {
    email: string;
    password: string;
  }, // Tipo de dato del payload
  { rejectValue: string | string[] } // Tipo de dato del error
>("auth/login", async (payload, { rejectWithValue }) => {
  const validation = validateLoginData(payload);
  if (!validation.success) {
    return rejectWithValue(validation.errors ?? "Datos inválidos");
  }

  try {
    if (!validation.data) {
      throw new Error("Validation data is undefined");
    }
    const authUser = await loginApi(validation.data);
    return authUser;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logoutUser = createAsyncThunk<
  void, // No retorna datos
  void, // No recibe payload
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutApi();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
