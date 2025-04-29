export type Form = {
  uid: string;
  regulationId: string;
  name: string;
  description: string;
  sections: Section[];
};

export type FormPayload = {
  id?: string;
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
  options?: Option[];
  subQuestions?: Question[];
}

export type Option = {
  label: string;
  score: number;
};

export enum QuestionType {
  TEXT = "text",
  SINGLE_CHOICE = "single-choice",
  MULTIPLE_CHOICE = "multiple-choice",
}
