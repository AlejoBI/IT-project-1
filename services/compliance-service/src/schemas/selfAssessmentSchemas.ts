import { z } from "zod";

export const choiceOptionSchema = z.object({
  id: z.string().trim().min(1),
  label: z.string().trim().min(1),
  score: z.number().min(0).max(100),
});

const answerMetadataSchema = z.object({
  sectionId: z.string().trim().min(1),
  sectionTitle: z.string().trim().min(1),
  questionId: z.string().trim().min(1),
  questionText: z.string().trim().min(1),
  questionUrl: z.union([z.string().url(), z.literal("")]).optional(),
  subQuestionId: z.string().optional(),
  subQuestionText: z.string().optional(),
});

export const answerSchema = z.discriminatedUnion("type", [
  answerMetadataSchema.extend({
    type: z.literal("single-choice"),
    value: choiceOptionSchema,
  }),
  answerMetadataSchema.extend({
    type: z.literal("multiple-choice"),
    value: z.array(choiceOptionSchema).min(1),
  }),
  answerMetadataSchema.extend({
    type: z.literal("text"),
    value: z.string().trim().min(1),
  }),
]);

export const saveDraftSchema = z.object({
  userId: z.string().trim().min(1),
  regulationId: z.string().trim().min(1),
  formId: z.string().trim().min(1),
  sectionId: z.string().trim().min(1),
  sectionTitle: z.string().trim().min(1),
  answers: z.array(answerSchema),
});

export const submitAssessmentSchema = z.object({
  userId: z.string().trim().min(1),
  regulationId: z.string().trim().min(1),
  regulationName: z.string().trim().min(1),
  formId: z.string().trim().min(1),
  formName: z.string().trim().min(1),
});
