export type Form = {
  regulationId: string;
  name: string;
  description: string;
  sections: Section[];
};

export type FormPayload = {
  regulationId: string;
  name: string;
  description: string;
  sections: Section[];
};

export type Section = {
  title: string;
  questions: Question[];
};

export interface Question {
  text: string;
  type: "text" | "single-choice" | "multiple-choice";
  options?: string[];
  subQuestions?: Question[];
}

export enum QuestionType {
  TEXT = "text",
  SINGLE_CHOICE = "single-choice",
  MULTIPLE_CHOICE = "multiple-choice",
}
