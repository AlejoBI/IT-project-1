import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  recoverPasswordUser,
} from "./authActions";
import { AuthUser } from "../../../domain/models/types/authTypes";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  message?: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearNotification: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = undefined;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload as string;
      state.message = undefined;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
    });

    // Recover Password
    builder.addCase(recoverPasswordUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = undefined;
    });
    builder.addCase(recoverPasswordUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload as string;
    });
    builder.addCase(recoverPasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.message = undefined;
    });
  },
});

export const { setUser, clearNotification } = authSlice.actions;
export default authSlice.reducer;
