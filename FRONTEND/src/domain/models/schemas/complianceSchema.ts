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

export const SaveDraftSchema = z.object({
  userId: z.string(),
  regulationId: z.string(),
  formId: z.string(),
  sectionId: z.string(),
  sectionTitle: z.string(),
  answers: z.array(answerSchema),
});

// Esquema para validar el envío de la autoevaluación
export const SubmitAssessmentSchema = z.object({
  userId: z.string(),
  regulationId: z.string(),
  regulationName: z.string(),
  formId: z.string(),
  formName: z.string(),
});

export const SectionSchemaId = z.string().uuid();

export const CompliancesReportSchemaId = z.string().uuid();