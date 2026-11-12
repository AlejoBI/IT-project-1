export interface CreateComplianceReportParams {
  userId: string;
  selfAssessmentId: string;
  regulationId: string;
  regulationName: string;
  formId: string;
  formName: string;
  totalScore: number;
  sectionScores: { sectionId: string; sectionTitle: string; score: number }[];
  questionGaps?: QuestionGap[];
}

export interface QuestionGap {
  sectionId: string;
  sectionTitle: string;
  questionId: string;
  questionText: string;
  subQuestionId?: string;
  subQuestionText?: string;
  score: number;
}
