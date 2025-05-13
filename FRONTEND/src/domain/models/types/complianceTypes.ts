export type QuestionType = "single-choice" | "multiple-choice" | "text";

export interface ChoiceOption {
  id: string;
  label: string;
  score: number;
}

export interface SectionAnswer {
  sectionId: string;
  sectionTitle: string;
  questionId: string;
  questionText: string;
  subQuestionId?: string;
  subQuestionText?: string;
  type: QuestionType;
  value: ChoiceOption | ChoiceOption[] | string;
}

export interface SaveDraftPayload {
  userId: string;
  regulationId: string;
  formId: string;
  sectionId: string;
  sectionTitle: string;
  answers: SectionAnswer[];
}

export interface SubmitSelfAssessmentRequest {
  userId: string;
  regulationId: string;
  regulationName: string;
  formId: string;
  formName: string;
}

// Tipos para el GET /draft de la autoevaluación
export interface GetDraftRequest {
  userId: string;
  regulationId: string;
}

export interface ChoiceOption {
  label: string;
  score: number;
}

export type AnswerValue = string | ChoiceOption | ChoiceOption[];

export interface DraftAnswer {
  sectionId: string;
  sectionTitle: string;
  questionId: string;
  questionText: string;
  subQuestionId?: string;
  subQuestionText?: string;
  type: "text" | "single-choice" | "multiple-choice";
  value: AnswerValue;
}

export interface CompletedSection {
  sectionId: string;
  sectionTitle: string;
}

export interface GetDraftResponse {
  userId: string;
  regulationId: string;
  formId: string;
  answers: DraftAnswer[];
  completedSections: CompletedSection[];
  status: "in_progress";
  createdAt: string; // Firestore devuelve fecha como string ISO
  updatedAt: string;
}

// Scores de las secciones
export interface SectionScore {
  sectionId: string;
  score: number;
  sectionTitle: string;
}

export interface ComplianceReport {
  id: string;
  userId: string;
  regulationId: string;
  regulationName: string;
  formId: string;
  formName: string;
  sectionScores: SectionScore[];
  complianceStatus: "Cumple" | "No Cumple";
  selfAssessmentId: string;
  totalScore: number;
  createdAt: Date;
}

export interface SelfAssessmentReport {
  answers: DraftAnswer[];
  completedSections: CompletedSection[];
  formId: string;
  regulationId: string;
  userId: string;
  status: "completed" | "in_progress" | string;
}
