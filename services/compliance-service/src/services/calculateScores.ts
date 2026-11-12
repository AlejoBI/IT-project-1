import { Answer } from "../models/selfAssessmentModel";

export const calculateScores = (answers: Answer[]) => {
  const scoreForAnswer = (answer: Answer): number => {
    if (answer.type === "multiple-choice" && Array.isArray(answer.value)) {
      return Math.min(answer.value.reduce((sum, option) => sum + (option?.score || 0), 0), 100);
    }
    if (answer.type === "single-choice" && typeof answer.value === "object" && !Array.isArray(answer.value)) {
      return Math.min(answer.value.score || 0, 100);
    }
    return 100;
  };

  const sectionMap = answers.reduce(
    (acc, answer) => {
      const { sectionId, sectionTitle } = answer;

      if (!acc[sectionId]) {
        acc[sectionId] = { sectionTitle, answers: [] };
      }

      acc[sectionId].answers.push(answer);
      return acc;
    },
    {} as Record<string, { sectionTitle: string; answers: Answer[] }>
  );

  const sectionScores = Object.entries(sectionMap).map(([sectionId, { sectionTitle, answers }]) => {
    // solo se considera score si es subpregunta (tiene subQuestionId)
    const evaluableAnswers = answers.filter((ans) => ans.subQuestionId || ans.subQuestionText);

    const totalPossible = evaluableAnswers.length * 100;

    const totalEarned = evaluableAnswers
      .map((ans) => {
        return scoreForAnswer(ans);
      })
      .reduce((sum, val) => sum + val, 0);

    const score = totalPossible > 0 ? (totalEarned / totalPossible) * 100 : 0;

    return {
      sectionId,
      sectionTitle,
      score: Math.round(score),
    };
  });

  const totalScore = sectionScores.length
    ? Math.round(
        sectionScores.map((s) => s.score).reduce((a, b) => a + b, 0) / sectionScores.length
      )
    : 0;

  return {
    totalScore,
    sectionScores,
    questionGaps: answers
      .filter((answer) => answer.subQuestionId || answer.subQuestionText)
      .map((answer) => ({ ...answer, score: scoreForAnswer(answer) }))
      .filter((answer) => answer.score < 80),
  };
};
