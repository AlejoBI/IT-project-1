import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthPayload } from "../../models/authTypes";
import { User } from "../../models/userTypes";
import { loginService, registerService, logoutService } from "./authService";
import { createUserAction } from "../user/userActions";

export const loginUser = createAsyncThunk<
  User,
  AuthPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const authUser = await loginService(payload);

    return authUser;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const registerUser = createAsyncThunk<
  User,
  AuthPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const authUser = await registerService(payload);

    const userData = {
      uid: authUser.uid,
      name: authUser.name || null,
      email: authUser.email || null,
      emailVerified: authUser.emailVerified,
      role: "standard_user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await dispatch(createUserAction(userData));

    return userData;
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
