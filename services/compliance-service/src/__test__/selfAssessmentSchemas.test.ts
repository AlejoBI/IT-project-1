import {
  answerSchema,
  saveDraftSchema,
  submitAssessmentSchema,
} from "../schemas/selfAssessmentSchemas.js";

const choice = { id: "option-1", label: "Cumple", score: 100 };
const metadata = {
  sectionId: "section-1",
  sectionTitle: "Gobierno",
  questionId: "question-1",
  questionText: "¿Existe el control?",
};

describe("self-assessment schemas", () => {
  it("acepta valores compatibles con una pregunta de selección simple", () => {
    expect(
      answerSchema.safeParse({ ...metadata, type: "single-choice", value: choice }).success
    ).toBe(true);
  });

  it("rechaza un valor de texto para una pregunta de selección", () => {
    expect(
      answerSchema.safeParse({ ...metadata, type: "single-choice", value: "Cumple" }).success
    ).toBe(false);
  });

  it("rechaza respuestas de texto vacías", () => {
    expect(answerSchema.safeParse({ ...metadata, type: "text", value: "   " }).success).toBe(false);
  });

  it("rechaza un borrador sin identificadores requeridos", () => {
    expect(
      saveDraftSchema.safeParse({
        userId: "",
        regulationId: "regulation-1",
        formId: "form-1",
        sectionId: "section-1",
        sectionTitle: "Gobierno",
        answers: [],
      }).success
    ).toBe(false);
  });

  it("valida los identificadores necesarios para enviar una evaluación", () => {
    expect(
      submitAssessmentSchema.safeParse({
        userId: "user-1",
        regulationId: "regulation-1",
        regulationName: "ISO 27001",
        formId: "form-1",
        formName: "Evaluación base",
      }).success
    ).toBe(true);
  });
});
