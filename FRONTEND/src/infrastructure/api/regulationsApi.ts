import api from "./axios";
import { Regulation } from "../../domain/models/types/regulationsTypes";

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