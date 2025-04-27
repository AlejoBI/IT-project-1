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
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Obtener usuarios
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

    // Obtener usuario
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

    // Actualizar usuario
    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
