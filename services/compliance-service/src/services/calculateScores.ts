import { Answer } from "../models/selfAssessmentModel";

export const calculateScores = (answers: Answer[]) => {
  const sectionMap = answers.reduce((acc, answer) => {
    const { sectionId, sectionTitle } = answer;

    if (!acc[sectionId]) {
      acc[sectionId] = { sectionTitle, answers: [] };
    }

    acc[sectionId].answers.push(answer);
    return acc;
  }, {} as Record<string, { sectionTitle: string; answers: Answer[] }>);

  const sectionScores = Object.entries(sectionMap).map(
    ([sectionId, { sectionTitle, answers }]) => {
      // solo se considera score si es subpregunta (tiene subQuestionId)
      const evaluableAnswers = answers.filter(
        (ans) => ans.subQuestionId || ans.subQuestionText
      );

      const totalPossible = evaluableAnswers.length * 100;

      const totalEarned = evaluableAnswers
        .map((ans) => {
          if (ans.type === "multiple-choice" && Array.isArray(ans.value)) {
            return Math.min(
              ans.value.reduce((sum, opt) => sum + (opt?.score || 0), 0),
              100
            );
          }

          if (ans.type === "single-choice" && typeof ans.value === "object") {
            if (Array.isArray(ans.value)) {
              return 0; // Handle array case, as 'score' does not exist on arrays
            }
            return Math.min(ans.value.score || 0, 100);
          }

          return 0;
        })
        .reduce((sum, val) => sum + val, 0);

      const score = totalPossible > 0 ? (totalEarned / totalPossible) * 100 : 0;

      return {
        sectionId,
        sectionTitle,
        score: Math.round(score),
      };
    }
  );

  const totalScore = sectionScores.length
    ? Math.round(
        sectionScores.map((s) => s.score).reduce((a, b) => a + b, 0) /
          sectionScores.length
      )
    : 0;

  return {
    totalScore,
    sectionScores,
  };
};
