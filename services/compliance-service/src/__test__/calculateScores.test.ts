import { calculateScores } from "../services/calculateScores";
import { Answer } from "../models/selfAssessmentModel";

const answer = (overrides: Partial<Answer>): Answer => ({
  sectionId: "section-1",
  sectionTitle: "Gobierno",
  questionId: "question-1",
  questionText: "Pregunta",
  subQuestionId: "subquestion-1",
  type: "single-choice",
  value: { label: "Cumple", score: 100 },
  ...overrides,
});

describe("calculateScores", () => {
  it("calcula el promedio total a partir de los puntajes de sección", () => {
    const result = calculateScores([
      answer({ value: { label: "Cumple", score: 80 } }),
      answer({
        sectionId: "section-2",
        sectionTitle: "Operación",
        value: { label: "Parcial", score: 60 },
      }),
    ]);

    expect(result.sectionScores).toEqual([
      { sectionId: "section-1", sectionTitle: "Gobierno", score: 80 },
      { sectionId: "section-2", sectionTitle: "Operación", score: 60 },
    ]);
    expect(result.totalScore).toBe(70);
    expect(result.questionGaps).toEqual([
      expect.objectContaining({ questionId: "question-1", score: 60 }),
    ]);
  });

  it("limita a 100 el puntaje acumulado de una respuesta múltiple", () => {
    const result = calculateScores([
      answer({
        type: "multiple-choice",
        value: [
          { label: "A", score: 70 },
          { label: "B", score: 60 },
        ],
      }),
    ]);

    expect(result.totalScore).toBe(100);
    expect(result.sectionScores[0].score).toBe(100);
  });

  it("ignora respuestas de pregunta principal sin subpregunta", () => {
    const result = calculateScores([
      answer({ subQuestionId: undefined, subQuestionText: undefined }),
    ]);

    expect(result.totalScore).toBe(0);
    expect(result.sectionScores[0].score).toBe(0);
  });
});
