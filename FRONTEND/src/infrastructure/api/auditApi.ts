import api from "./axios";
import { Audit } from "../../domain/models/types/auditTypes";

export const createOrUpdateAuditApi = async (Data: Audit) => {
  const response = await api.post("/api/audit/create", Data);
  return response.data;
};

// GET: Obtener las evaluaciones para auditoría
export const getSelfAssessmentToAuditsApi = async (userId: string) => {
  const response = await api.get(
    `/api/compliance/self-assessments/for-audits/${userId}`
  );
  return response.data;
};

// GET: Obtener las auditorías por ID de autoevaluación
export const getAuditsBySelfAssessmentIdApi = async (selfAssessmentId: string) => {
  const response = await api.get(`/api/audit/${selfAssessmentId}`);
  return response.data;
};
