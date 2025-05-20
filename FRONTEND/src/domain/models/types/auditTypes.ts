import { SectionScore, SectionAnswer } from "./complianceTypes";

export type Audit = {
  auditorId: string;
  auditorName: string;
  selfAssessmentId: string;
  sectionAudit: AuditSection;
};

export type AuditByUser = {
  userId: string;
  selfAssessmentId: string;
  regulationId: string;
  regulationName: string;
  formId: string;
  formName: string;
  auditStatus?: string;
  totalScore?: number;
  answers?: SectionAnswer[];
  sectionScores?: SectionScore[];
};

export type AuditSection = {
  sectionId: string;
  sectionTitle: string;
  status: string;
  observation: string;
};

export type AuditSectionFormData = {
  auditComment: string;
  complianceStatus: string;
};

export interface SelfAssessmentToAudit {
  id?: string;
  userId: string;
  regulationId: string;
  regulationName: string;
  formId: string;
  formName: string;
  auditStatus?: string;
  totalScore?: number;
  answers?: SectionAnswer[];
  sectionScores?: SectionScore[];
}
