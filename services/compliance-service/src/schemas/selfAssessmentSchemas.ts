import { z } from "zod";

const choiceOptionSchema = z.object({
  label: z.string(),
  score: z.number().min(0).max(100),
});

const answerSchema = z.object({
  sectionId: z.string(),
  sectionTitle: z.string(),
  questionId: z.string(),
  questionText: z.string(),
  subQuestionId: z.string().optional(),
  subQuestionText: z.string().optional(),
  type: z.enum(["single-choice", "multiple-choice", "text"]),
  value: z.union([choiceOptionSchema, z.array(choiceOptionSchema), z.string()]),
});

export const saveDraftSchema = z.object({
  userId: z.string(),
  regulationId: z.string(),
  formId: z.string(),
  formVersion: z.number(),
  sectionId: z.string(),
  sectionTitle: z.string(),
  answers: z.array(answerSchema),
});

export const submitAssessmentSchema = z.object({
  userId: z.string(),
  regulationId: z.string(),
  regulationName: z.string(),
  formId: z.string(),
  formName: z.string(),
});
