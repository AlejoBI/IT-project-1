import api from "./axios";

export const saveComplianceApi = async (complianceData: {
  responses: { [key: string]: string };
}) => {
  try {
    const response = await api.post("/api/compliance/save", complianceData);
    return response.data;
  } catch (error: unknown) {
    console.error("Error al guardar la evaluación:", error);
    throw error;
  }
};