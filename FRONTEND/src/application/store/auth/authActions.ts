import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  loginApi,
  registerApi,
  logoutApi,
  recoverPasswordApi,
} from "../../../infrastructure/api/authApi";
import { AuthUser } from "../../../domain/models/types/authTypes";
import { validateClient } from "../../../shared/zodUtils";
import {
  registerSchema,
  loginSchema,
} from "../../../domain/models/schemas/authSchema";

export const registerUser = createAsyncThunk<
  AuthUser,
  { username: string; email: string; password: string },
  { rejectValue: string | string[] }
>("auth/register", async (payload, { rejectWithValue }) => {
  const validation = validateClient(registerSchema, payload);
  if (!validation.success) {
    return rejectWithValue(validation.error ?? "Datos inválidos");
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
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al registrar el usuario";
    return rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string | string[] }
>("auth/login", async (payload, { rejectWithValue }) => {
  const validation = validateClient(loginSchema, payload);
  if (!validation.success) {
    return rejectWithValue(validation.error ?? "Datos inválidos");
  }

  try {
    const authUser = await loginApi(validation.data!);
    return authUser;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al iniciar sesión";
    return rejectWithValue(errorMessage);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al cerrar sesión";
    return rejectWithValue(errorMessage);
    }
  }
);

export const recoverPasswordUser = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("auth/recoverPassword", async (email, { rejectWithValue }) => {
  try {
    await recoverPasswordApi(email);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al recuperar la contraseña";
    return rejectWithValue(errorMessage);
  }
});
