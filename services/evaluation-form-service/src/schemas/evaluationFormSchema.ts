import { z } from "zod";
import { answerEnum } from "../models/formModels.js";

export const fullEvaluationFormSchema = z.object({
  regulationId: z.string(),
  name: z.string(),
  description: z.string(),
  sections: z.array(
    z.object({
      title: z.string(),
      questions: z.array(
        z
          .object({
            text: z.string(),
            type: z.nativeEnum(answerEnum),
            options: z.array(z.string()).optional(),
            isRequired: z.boolean(),
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
          )
      ),
    })
  ),
});

// Schemas for evaluation forms, sections, and questions
export const evaluationFormSchema = z.object({
  regulationId: z.string(),
  name: z.string(),
  description: z.string(),
});
export const evaluationFormUpdateSchema = evaluationFormSchema.partial();

export const formSectionSchema = z.object({
  formId: z.string(),
  title: z.string(),
});
export const formSectionUpdateSchema = formSectionSchema.partial();

const baseFormQuestionSchema = z.object({
  sectionId: z.string(),
  text: z.string(),
  type: z.nativeEnum(answerEnum),
  options: z.array(z.string()).optional(),
  isRequired: z.boolean(),
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
