import { createSlice } from "@reduxjs/toolkit";
import { sendNotification } from "./notificationActions";

interface NotificationState {
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: NotificationState = {
  loading: false,
  error: null,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotificationState: (state) => {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // send notification
    builder.addCase(sendNotification.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(sendNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearNotificationState } =
  notificationSlice.actions;
export default notificationSlice.reducer;
