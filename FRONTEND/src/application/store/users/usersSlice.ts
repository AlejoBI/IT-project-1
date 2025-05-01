import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersAction,
  fetchUserAction,
  updateUserAction,
} from "./usersActions";
import { User } from "../../../domain/models/types/userTypes";

interface UsersState {
  users: User[] | null;
  loading: boolean;
  error: string | null;
  notification: {
    message: string;
    type: "success" | "error" | "warning";
  } | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  notification: null, // Agregar estado para notificaciones
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearNotification(state) {
      state.notification = null; // Limpiar notificación
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    });
    builder.addCase(fetchUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserAction.fulfilled, (state) => {
      state.loading = false;
      state.notification = {
        // Notificación de éxito
        message: "Usuario actualizado con éxito",
        type: "success",
      };
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.notification = {
        // Notificación de error
        message: (action.payload as string) || "Error al actualizar el usuario",
        type: "error",
      };
    });
  },
});

export const { clearNotification } = userSlice.actions;
export default userSlice.reducer;
