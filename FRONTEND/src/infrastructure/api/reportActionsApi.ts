import api from "./axios";
import { ReportAction, ReportActionStatus } from "../../domain/models/types/complianceTypes";

export type ReportActionInput = {
  title: string;
  description?: string;
  responsible?: string;
  dueDate?: string;
  status?: ReportActionStatus;
};

export const getReportActionsApi = async (reportId: string): Promise<ReportAction[]> => {
  const response = await api.get(`/api/compliance/compliance-reports/${reportId}/actions`);
  return response.data;
};

export const createReportActionApi = async (
  reportId: string,
  input: ReportActionInput
): Promise<{ id: string; message: string }> => {
  const response = await api.post(`/api/compliance/compliance-reports/${reportId}/actions`, input);
  return response.data;
};

export const updateReportActionApi = async (
  reportId: string,
  actionId: string,
  input: Partial<ReportActionInput>
): Promise<{ message: string }> => {
  const response = await api.patch(
    `/api/compliance/compliance-reports/${reportId}/actions/${actionId}`,
    input
  );
  return response.data;
};
