import api from "./axios";
import { Notification } from "../../domain/models/types/notificationTypes";

export const sendNotificationApi = async (payload: Notification) => {
  const response = await api.post(`/api/notifications/send`, payload);
  return response.data;
};
