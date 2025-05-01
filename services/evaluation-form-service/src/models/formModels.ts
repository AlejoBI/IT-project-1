export enum answerEnum {
  TEXT = "text",
  SINGLE_CHOICE = "single-choice",
  MULTIPLE_CHOICE = "multiple-choice",
}

export interface EvaluationForm {
  regulationId: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FormSection {
  formId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionOption {
  label: string;
  score: number; // de 0 a 100
}

export interface FormQuestion {
  sectionId: string;
  text: string;
  type: string;
  options?: QuestionOption[];
  subQuestions?: FormQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}
