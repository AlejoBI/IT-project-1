import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendNotificationApi } from "../../../infrastructure/api/notificationApi";
import { AxiosError } from "axios";
import { Notification } from "../../../domain/models/types/notificationTypes";

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
