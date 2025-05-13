import { z } from "zod";

const choiceOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  score: z.number().min(0).max(100),
});

const answerSchema = z.object({
  sectionId: z.string(),
  sectionTitle: z.string(),
  questionId: z.string(),
  questionText: z.string(),
  questionUrl: z.union([z.string().url(), z.literal("")]).optional(),
  subQuestionId: z.string().optional(),
  subQuestionText: z.string().optional(),
  type: z.enum(["single-choice", "multiple-choice", "text"]),
  value: z.union([choiceOptionSchema, z.array(choiceOptionSchema), z.string()]),
});

export const saveDraftSchema = z.object({
  userId: z.string(),
  regulationId: z.string(),
  formId: z.string(),
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
