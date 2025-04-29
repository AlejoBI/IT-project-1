import api from "./axios";
import { Form } from "../../domain/models/types/EvaluationFormTypes";

export const createEvaluationFormApi = async (Data: Form) => {
  try {
    const response = await api.post("/api/forms/full", Data);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

export const deleteEvaluationFormApi = async (regulationId: string) => {
  try {
    const response = await api.delete(`/api/forms/${regulationId}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
}

export const getEvaluationFormsApi = async () => {
  try {
    const response = await api.get("/api/forms/");
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

export const getEvaluationFormById = async (uid: string) => {
  try {
    const response = await api.get(`/api/forms/${uid}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

export const updateEvaluationFormApi = async (uid: string, updates: Partial<Form>) => {
  try {
    const response = await api.put(`/api/forms/${uid}`, updates);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};