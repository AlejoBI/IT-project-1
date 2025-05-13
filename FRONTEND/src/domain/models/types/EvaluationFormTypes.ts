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

export type FormGetResponse = {
  id: string;
  regulationId: string;
  name: string;
  description: string;
  sections: SectionGetResponse[];
};

export type SectionGetResponse = {
  id: string;
  title: string;
  questions: QuestionGetResponse[];
};

export type QuestionGetResponse = {
  id: string;
  text: string;
  type: "text" | "single-choice" | "multiple-choice";
  options?: OptionGetResponse[]; 
  subQuestions?: QuestionGetResponse[]; 
};

export type OptionGetResponse = {
  id?: string; // si agregas `id` para opciones más adelante
  label: string;
  score: number;
};
