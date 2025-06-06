import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsersAction,
  fetchUserAction,
  fetchUsersWithEvaluationsAndAuditsAction,
  updateUserAction,
} from "./usersActions";
import { User } from "../../../domain/models/types/userTypes";

interface UsersState {
  users: User[] | null;
  user?: User | null;
  loading: boolean;
  error: string | null;
  message: string;
}

const initialState: UsersState = {
  users: [],
  user: null,
  loading: false,
  error: null,
  message: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearNotification(state) {
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
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
      state.error = action.payload as string;
    });

    builder.addCase(fetchUsersAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload as User[];
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchUsersWithEvaluationsAndAuditsAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUsersWithEvaluationsAndAuditsAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.users = action.payload as User[];
      }
    );
    builder.addCase(fetchUsersWithEvaluationsAndAuditsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error as string;
    });
  },
});

export const { clearNotification } = userSlice.actions;
export default userSlice.reducer;
