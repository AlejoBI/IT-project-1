import { z } from "zod";
import { answerEnum } from "../models/formModels.js";

export const optionSchema = z.object({
  label: z.string(),
  score: z.number().min(0).max(100),
});

export const questionSchema: z.ZodType<any> = z
  .object({
    text: z.string(),
    type: z.nativeEnum(answerEnum),
    options: z.array(optionSchema).optional(),
    subQuestions: z.lazy(() => z.array(questionSchema)).optional(),
  })
  .refine(
    (data) =>
      data.type !== answerEnum.TEXT ||
      !data.options ||
      (Array.isArray(data.options) && data.options.length === 0),
    {
      message:
        "Para preguntas de tipo 'text', las opciones deben ser un array vacío o estar ausentes.",
      path: ["options"],
    }
  )
  .refine(
    (data) =>
      data.type !== answerEnum.SINGLE_CHOICE ||
      (Array.isArray(data.options) && data.options.length >= 1),
    {
      message:
        "Las preguntas de tipo 'single-choice' deben tener al menos 1 opción.",
      path: ["options"],
    }
  )
  .refine(
    (data) =>
      data.type !== answerEnum.MULTIPLE_CHOICE ||
      (Array.isArray(data.options) && data.options.length >= 2),
    {
      message:
        "Las preguntas de tipo 'multiple-choice' deben tener al menos 2 opciones.",
      path: ["options"],
    }
  );

export const fullEvaluationFormSchema = z.object({
  regulationId: z.string(),
  name: z.string(),
  description: z.string(),
  sections: z.array(
    z.object({
      title: z.string(),
      questions: z.array(questionSchema),
    })
  ),
});

// Schemas for evaluation forms, sections, and questions individually
export const evaluationFormSchema = z.object({
  regulationId: z.string(),
  name: z.string(),
  description: z.string(),
});
export const evaluationFormUpdateSchema = evaluationFormSchema.partial();

// Schemas for sections individually
export const formSectionSchema = z.object({
  formId: z.string(),
  title: z.string(),
});
export const formSectionUpdateSchema = formSectionSchema.partial();

// Schemas for questions individually
const baseFormQuestionSchema = z.object({
  sectionId: z.string(),
  text: z.string(),
  type: z.nativeEnum(answerEnum),
  options: z.array(z.string()).optional(),
  subQuestions: z.lazy(() => z.array(questionSchema)).optional(), // Referencia recursiva
});
export const formQuestionSchema = baseFormQuestionSchema.refine(
  (data) =>
    (data.type === answerEnum.TEXT && !data.options) ||
    ([answerEnum.MULTIPLE_CHOICE, answerEnum.SINGLE_CHOICE].includes(
      data.type
    ) &&
      Array.isArray(data.options) &&
      data.options.length > 0),
  {
    message:
      "Las opciones son obligatorias para 'single-choice' y 'multiple-choice', y deben omitirse en 'text'.",
  }
);
export const formQuestionUpdateSchema = baseFormQuestionSchema.partial();
