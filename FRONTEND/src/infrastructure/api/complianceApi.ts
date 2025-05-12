import api from "./axios";
import {
  SaveDraftPayload,
  SubmitSelfAssessmentRequest,
  GetDraftRequest,
} from "../../domain/models/types/complianceTypes";

// GET: Obtener la autoevaluación en progreso
export const fetchSelfAssessmentApi = async (data: GetDraftRequest) => {
  const response = await api.get(
    `/api/compliance/self-assessments/draft/${data.regulationId}/${data.userId}`
  );
  return response.data;
};

// POST: Guardar una autoevaluación (borrador o avance)
export const saveSelfAssessmentApi = async (draft: SaveDraftPayload) => {
  const response = await api.post(
    "/api/compliance/self-assessments/save",
    draft
  );
  return response.data;
};

// POST: Completar la autoevaluación
export const completeSelfAssessmentApi = async (
  payload: SubmitSelfAssessmentRequest
) => {
  const response = await api.post(
    `/api/compliance/self-assessments/submit`,
    payload
  );
  return response.data;
};

// GET: Obtener los reportes de cumplimiento
export const getComplianceReportsApi = async (userId: string) => {
  const response = await api.get(
    `/api/compliance/compliance-reports/${userId}`
  );
  return response.data;
};

export const getSelfAssessmentReportApi = async (userId: string) => {
  const reponse = await api.get(
    `/api/compliance/self-assessments/${userId}`
  );
  return reponse.data;
}
