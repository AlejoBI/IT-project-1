import { z } from "zod";
import { Question } from "../types/EvaluationFormTypes";

export const formSchemaId = z.string().uuid();

export const questionSchema: z.ZodType<Question> = z.lazy(() =>
  z.object({
    text: z.string().min(1, "El texto de la pregunta es obligatorio"),
    type: z.enum(["text", "single-choice", "multiple-choice"]),
    options: z.array(z.object({ label: z.string(), score: z.number() })).optional(),
    subQuestions: z
      .array(questionSchema) 
      .optional(),
  })
);

export const formSchema = z.object({
  regulationId: z.string().min(1, "Debe seleccionar una regulación"),
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  sections: z.array(
    z.object({
      title: z.string().min(1, "El título de la sección es obligatorio"),
      questions: z.array(questionSchema), 
    })
  ),
});
