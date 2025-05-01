export interface CreateComplianceReportParams {
  userId: string;
  selfAssessmentId: string;
  regulationId: string;
  regulationName: string;
  formId: string;
  formName: string;
  totalScore: number;
  sectionScores: { sectionId: string; sectionTitle: string; score: number }[];
}
