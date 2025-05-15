import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendNotificationApi } from "../../infrastructure/api/notificationApi";
import { Notification } from "../../domain/models/types/notificationTypes";
import { AxiosError } from "axios";

export const sendNotification = createAsyncThunk<
  string,
  Notification,
  { rejectValue: string }
>("notification/sendNotification", async (payload, { rejectWithValue }) => {
  try {
    const result = await sendNotificationApi(payload);
    return result.message;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as { error: string };
    const errorMessage = errorData?.error || "Error al enviar la notificación";
    return rejectWithValue(errorMessage);
  }
});
