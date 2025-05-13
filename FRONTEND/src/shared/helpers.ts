import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

import { SectionGetResponse } from "../domain/models/types/EvaluationFormTypes";
import { SectionAnswer } from "../domain/models/types/complianceTypes";

export const transformSectionAnswers = (
  section: SectionGetResponse,
  rawAnswers: Record<string, string | string[]>
): SectionAnswer[] => {
  const answers: SectionAnswer[] = [];

  const transformValue = (
    type: string,
    rawValue: string | string[] | undefined,
    options?: { id?: string; label: string; score: number }[]
  ) => {
    if (!rawValue) return null;

    if (type === "single-choice") {
      const selected = options?.find((opt) => opt.id === rawValue);
      return selected
        ? {
            id: selected.id ?? "",
            label: selected.label,
            score: selected.score,
          }
        : null;
    }

    if (type === "multiple-choice" && Array.isArray(rawValue)) {
      return (
        options
          ?.filter((opt) => rawValue.includes(opt.id ?? ""))
          .map((opt) => ({
            id: opt.id ?? "",
            label: opt.label,
            score: opt.score,
          })) ?? []
      );
    }

    return Array.isArray(rawValue) ? rawValue.join(", ") : rawValue;
  };

  section.questions.forEach((q) => {
    const baseAnswer = {
      sectionId: section.id,
      sectionTitle: section.title,
      questionId: q.id,
      questionText: q.text,
    };

    const rawValue = rawAnswers[q.id];
    const mainValue = transformValue(q.type, rawValue, q.options);

    if (mainValue !== null) {
      answers.push({
        ...baseAnswer,
        type: q.type,
        value: mainValue,
      });
    }

    const selectedMainOption =
      q.type === "single-choice" && typeof rawValue === "string"
        ? q.options?.find((opt) => opt.id === rawValue)
        : null;

    const showSubQuestions =
      selectedMainOption &&
      (selectedMainOption.label === "Sí" ||
        selectedMainOption.label === "Parcialmente");

    if (showSubQuestions && q.subQuestions?.length) {
      q.subQuestions.forEach((sub) => {
        const subValue = rawAnswers[sub.id];
        const transformedSub = transformValue(sub.type, subValue, sub.options);
        if (transformedSub !== null) {
          answers.push({
            ...baseAnswer,
            subQuestionId: sub.id,
            subQuestionText: sub.text,
            type: sub.type,
            value: transformedSub,
          });
        }
      });
    }
  });

  return answers;
};
