import api from "./axios";
import { Form } from "../../domain/models/types/EvaluationFormTypes";

export const createEvaluationFormApi = async (Data: Form) => {
  const response = await api.post("/api/evaluation/forms/full", Data);
  return response.data;
};

export const deleteEvaluationFormApi = async (regulationId: string) => {
  const response = await api.delete(`/api/evaluation/forms/${regulationId}`);
  return response.data;
};

export const getEvaluationFormsApi = async () => {
  const response = await api.get("/api/evaluation/forms/");
  return response.data;
};

export const getEvaluationFormById = async (uid: string) => {
  const response = await api.get(`/api/evaluation/forms/${uid}`);
  return response.data;
};

export const updateEvaluationFormApi = async (
  uid: string,
  updates: Partial<Form>
) => {
  const response = await api.put(`/api/evaluation/forms/${uid}`, updates);
  return response.data;
};
