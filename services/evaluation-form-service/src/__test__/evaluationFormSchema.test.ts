import { answerEnum } from "../models/formModels.js";
import {
  formQuestionSchema,
  fullEvaluationFormSchema,
  questionSchema,
} from "../schemas/evaluationFormSchema.js";

describe("evaluation form schemas", () => {
  it("acepta una pregunta de texto sin opciones", () => {
    expect(
      questionSchema.safeParse({
        text: "Describe el control",
        type: answerEnum.TEXT,
      }).success
    ).toBe(true);
  });

  it("rechaza preguntas de selección simple sin opciones", () => {
    expect(
      questionSchema.safeParse({
        text: "¿Existe el control?",
        type: answerEnum.SINGLE_CHOICE,
      }).success
    ).toBe(false);
  });

  it("rechaza selección múltiple con menos de dos opciones", () => {
    expect(
      questionSchema.safeParse({
        text: "Selecciona controles",
        type: answerEnum.MULTIPLE_CHOICE,
        options: [{ label: "A", score: 50 }],
      }).success
    ).toBe(false);
  });

  it("rechaza una puntuación fuera del rango permitido", () => {
    expect(
      questionSchema.safeParse({
        text: "¿Existe el control?",
        type: answerEnum.SINGLE_CHOICE,
        options: [{ label: "Sí", score: 101 }],
      }).success
    ).toBe(false);
  });

  it("valida opciones de preguntas CRUD con el contrato del servicio", () => {
    expect(
      formQuestionSchema.safeParse({
        sectionId: "section-1",
        text: "¿Existe el control?",
        type: answerEnum.SINGLE_CHOICE,
        options: ["Sí", "No"],
      }).success
    ).toBe(true);
  });

  it("valida un formulario completo con secciones y preguntas", () => {
    expect(
      fullEvaluationFormSchema.safeParse({
        regulationId: "iso-27001",
        name: "Evaluación base",
        description: "Formulario de evaluación",
        sections: [
          {
            title: "Gobierno",
            questions: [
              {
                text: "¿Existe una política?",
                type: answerEnum.SINGLE_CHOICE,
                options: [{ label: "Sí", score: 100 }],
              },
            ],
          },
        ],
      }).success
    ).toBe(true);
  });
});
