import React from "react";
import { SectionAnswer } from "../../../domain/models/types/complianceTypes";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../../shared/constants";

interface GroupedQuestions {
  [key: string]: {
    questionText: string;
    questionUrl?: string;
    type: string;
    value: string | string[] | null;
    subQuestions: {
      id: string;
      text: string;
      value: string | string[];
    }[];
  };
}

const AuditContent = ({
  sectionAnswers,
  selectedSectionId,
}: {
  sectionAnswers: SectionAnswer[];
  selectedSectionId: string | null;
}) => {
  if (!selectedSectionId) {
    return (
      <div
        className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 rounded-2xl shadow mb-6 mt-4 h-auto w-screen max-w-screen-lg mx-auto`}
      >
        <p
          className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} text-center`}
        >
          Seleccione una sección para auditar.
        </p>
      </div>
    );
  }

  const filteredAnswers = sectionAnswers.filter(
    (item) => item.sectionId === selectedSectionId
  );

  if (filteredAnswers.length === 0) {
    return (
      <div
        className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} h-auto w-auto p-6 rounded-2xl shadow`}
      >
        <p
          className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Esta sección no contiene preguntas.
        </p>
      </div>
    );
  }

  const grouped = filteredAnswers.reduce((acc: GroupedQuestions, item) => {
    if (!acc[item.questionId]) {
      acc[item.questionId] = {
        questionText: item.questionText,
        questionUrl: item.questionUrl,
        type: item.type,
        value: item.subQuestionId
          ? null
          : Array.isArray(item.value)
          ? item.value.map((v) =>
              typeof v === "object" && v !== null && "label" in v
                ? String(v.label)
                : String(v)
            )
          : typeof item.value === "object" &&
            item.value !== null &&
            "label" in item.value
          ? String(item.value.label)
          : String(item.value),
        subQuestions: [],
      };
    }

    if (item.subQuestionId) {
      acc[item.questionId].subQuestions.push({
        id: item.subQuestionId,
        text: item.subQuestionText || "",
        value: Array.isArray(item.value)
          ? item.value.map((v) =>
              typeof v === "object" && v !== null && "label" in v
                ? String(v.label)
                : String(v)
            )
          : typeof item.value === "object" &&
            item.value !== null &&
            "label" in item.value
          ? String(item.value.label)
          : typeof item.value === "string"
          ? item.value
          : item.value !== undefined && item.value !== null
          ? String(item.value)
          : "",
      });
    }

    return acc;
  }, {});

  return (
    <div
      className={`${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} p-6 rounded-2xl shadow mb-6 mt-4 h-auto w-screen max-w-screen-lg mx-auto`}
    >
      <h3
        className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} text-xl font-semibold mb-4`}
      >
        Preguntas de la sección
      </h3>
      <div className="space-y-6">
        {Object.entries(grouped).map(([questionId, question]) => (
          <div
            key={questionId}
            className="border border-gray-300 dark:border-[#2A4C61] rounded-lg p-4"
          >
            <p
              className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} font-medium`}
            >
              Pregunta: {question.questionText}
            </p>
            {question.value !== null && (
                <p
                className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} mb-2`}
                >
                Respuesta: {String(question.value)}
                </p>
              )}
              {question.questionUrl && (
                <div className="mb-2">
                <span className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY}`}>URL Evidencia: </span>
                <a
                  href={question.questionUrl.startsWith("http") ? question.questionUrl : `//${question.questionUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} underline hover:text-blue-600 dark:hover:text-blue-400`}
                >
                  {question.questionUrl}
                </a>
                </div>
              )}
              {question.subQuestions.length > 0 && (
              <div className="ml-4 p-3 mt-4 border-l-4 border-blue-400 bg-gray-50 dark:bg-[#0F172A]">
                {question.subQuestions.map((sub) => (
                  <div key={sub.id} className="mb-3">
                    <p
                      className={`${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY} text-sm`}
                    >
                      Subpregunta: {sub.text}
                    </p>
                    <p
                      className={`${LIGHT_MODE_COLORS.TEXT_SECONDARY} ${DARK_MODE_COLORS.TEXT_SECONDARY} text-sm`}
                    >
                      Respuesta: {String(sub.value)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditContent;
