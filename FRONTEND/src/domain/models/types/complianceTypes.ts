export type QuestionType = "single-choice" | "multiple-choice" | "text";

export interface ChoiceOption {
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
