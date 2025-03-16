import { createSlice } from "@reduxjs/toolkit";
import { FIREBASE_SERVICE_ERROR_CODES } from "../../utils/constants";
import {
  createUserAction,
  fetchUserAction,
  updateUserAction,
} from "../services/user/userActions";
import { UserState } from "../models/userTypes";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Crear usuario
    builder.addCase(createUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(createUserAction.rejected, (state, action) => {
      state.loading = false;
      const errorCode =
        action.payload as keyof typeof FIREBASE_SERVICE_ERROR_CODES;
      state.error =
        FIREBASE_SERVICE_ERROR_CODES[errorCode] || "Error desconocido.";
    });

    // Obtener usuario
    builder.addCase(fetchUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserAction.rejected, (state, action) => {
      state.loading = false;
      const errorCode =
        action.payload as keyof typeof FIREBASE_SERVICE_ERROR_CODES;
      state.error =
        FIREBASE_SERVICE_ERROR_CODES[errorCode] || "Error desconocido.";
    });

    // Actualizar usuario
    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      if (state.user) {
        state.user = { ...state.user, ...action.payload.updates };
      }
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      const errorCode =
        action.payload as keyof typeof FIREBASE_SERVICE_ERROR_CODES;
      state.error =
        FIREBASE_SERVICE_ERROR_CODES[errorCode] || "Error desconocido.";
    });
  },
});

export default userSlice.reducer;
