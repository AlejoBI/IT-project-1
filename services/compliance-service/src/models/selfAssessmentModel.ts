export interface Answer {
  sectionId: string;
  sectionTitle: string;
  questionId: string;
  questionText: string;
  subQuestionId?: string;
  subQuestionText?: string;
  type: "single-choice" | "multiple-choice" | "text";
  value:
    | { label: string; score: number } // single-choice
    | { label: string; score: number }[] // multiple-choice
    | string; // text
}

export interface SectionScore {
  sectionId: string;
  sectionTitle: string;
  score: number;
}

export interface SelfAssessment {
  id: string;
  userId: string;
  regulationId: string;
  formId: string;
  answers: Answer[];
  totalScore: number;
  sectionScores: SectionScore[];
  observations?: string;
  createdAt: Date;
}

export interface SelfAssessmentSession {
  userId: string;
  regulationId: string;
  formId: string;
  formVersion: number;
  answers: Answer[]; // acumulados por secciones
  completedSections: string[]; // sección.id completadas
  status: "in_progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
