import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, registerService, logoutService } from "./authService";

export const registerUser = createAsyncThunk<
  {
    uid: string;
    name: string | null;
    email: string | null;
    emailVerified: boolean;
  },
  {
    email: string;
    password: string;
  },
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const authUser = await registerService(payload);

    const userData = {
      uid: authUser.uid,
      name: authUser.name || null,
      email: authUser.email || null,
      emailVerified: authUser.emailVerified,
    };

    return userData;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginUser = createAsyncThunk<
  {
    uid: string;
    name: string | null;
    email: string | null;
    emailVerified: boolean;
  }, // Tipo de dato que retorna
  {
    email: string;
    password: string;
  }, // Tipo de dato del payload
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const authUser = await loginService(payload);

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
    await logoutService();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
