import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../models/authTypes";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/authServices";

import { FIREBASE_AUTH_ERROR_CODES } from "../../utils/constants";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        const errorCode =
          action.payload as keyof typeof FIREBASE_AUTH_ERROR_CODES;

        state.error =
          FIREBASE_AUTH_ERROR_CODES[errorCode] || "Error desconocido.";
      })

      // 🟢 REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        const errorCode =
          action.payload as keyof typeof FIREBASE_AUTH_ERROR_CODES;

        state.error =
          FIREBASE_AUTH_ERROR_CODES[errorCode] || "Error desconocido.";
      })

      // 🔴 LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
