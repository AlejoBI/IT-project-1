import api from "./axios";
import { Regulation } from "../../domain/models/types/regulationsTypes";

// Crear regulacion
export const createRegulationApi = async (regulation: Regulation) => {
  try {
    const response = await api.post("/api/regulations/", regulation);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

// Obtener regulaciones
export const getRegulations = async () => {
  try {
    const response = await api.get("/api/regulations/");
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

// Obtener regulacion
export const getRegulation = async (uid: string) => {
  try {
    const response = await api.get(`/api/regulations/${uid}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

// Actualizar regulacion
export const updateRegulation = async (
  uid: string,
  updates: Partial<Regulation>
) => {
  try {
    const response = await api.put(`/api/regulations/${uid}`, updates);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

// Eliminar regulacion
export const deleteRegulation = async (uid: string) => {
  try {
    const response = await api.delete(`/api/regulations/${uid}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error al eliminar la normativa:", error); // Loguea el error
    throw error; // Vuelve a lanzar el error para que la acción lo pueda capturar
  }
};