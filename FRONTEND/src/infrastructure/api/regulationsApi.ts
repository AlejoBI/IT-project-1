import api from "./axios";
import { Regulation } from "../../domain/models/types/regulationsTypes";

// Crear regulacion
export const createRegulationApi = async (regulation: Regulation) => {
  const response = await api.post("/api/regulations/", regulation);
  return response.data;
};

// Obtener regulaciones
export const getRegulations = async () => {
  const response = await api.get("/api/regulations/");
  return response.data;
};

// Obtener regulacion
export const getRegulation = async (uid: string) => {
  const response = await api.get(`/api/regulations/${uid}`);
  return response.data;
};

// Actualizar regulacion
export const updateRegulation = async (
  uid: string,
  updates: Partial<Regulation>
) => {
  const response = await api.put(`/api/regulations/${uid}`, updates);
  return response.data;
};

// Eliminar regulacion
export const deleteRegulation = async (uid: string) => {
  const response = await api.delete(`/api/regulations/${uid}`);
  return response.data;
};
