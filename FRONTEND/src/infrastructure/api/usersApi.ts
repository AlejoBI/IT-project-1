import api from "./axios";
import { User } from "../../domain/models/types/userTypes";

// Obtener perfil de usuario
export const getUserProfile = async (uid: string) => {
  const response = await api.get(`/api/users/${uid}`);
  return response.data;
};

// Obtener perfiles de usuarios
export const getUserProfiles = async () => {
  const response = await api.get("/api/users/");
  return response.data;
};

// Obtener perfiles de usuarios con Evaluaciones y Auditorías
export const getUserProfilesWithEvaluationsAndAudits = async () => {
  const response = await api.get("/api/users/audit");
  return response.data;
};

// Actualizar perfil de usuario
export const updateUserProfile = async (
  uid: string,
  updates: Partial<User>
) => {
  const response = await api.put(`/api/users/${uid}`, updates);
  return response.data;
};
