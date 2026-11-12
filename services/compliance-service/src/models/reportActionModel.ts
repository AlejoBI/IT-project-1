export type ReportActionStatus = "pendiente" | "en_progreso" | "resuelta" | "vencida";

export interface ReportAction {
  id?: string;
  reportId: string;
  userId: string;
  title: string;
  description?: string;
  responsible?: string;
  dueDate?: string;
  status: ReportActionStatus;
  createdAt: Date;
  updatedAt: Date;
}
