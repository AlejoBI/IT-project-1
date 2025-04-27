import { z } from "zod";
import { answerEnum } from "../models/formModels.js";
// Schemas for full evaluation form creation
const questionSchema: z.ZodType<any> = z
  .object({
    text: z.string(),
    type: z.nativeEnum(answerEnum),
    options: z.array(z.string()).optional(),
    subQuestions: z.lazy(() => z.array(questionSchema)).optional(), // Referencia recursiva
  })
  .refine(
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
// Schemas for full evaluation form creation
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
