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