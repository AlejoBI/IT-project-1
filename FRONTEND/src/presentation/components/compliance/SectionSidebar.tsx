import React from "react";
import { useNavigate } from "react-router-dom";
import { SectionGetResponse } from "../../../domain/models/types/EvaluationFormTypes";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface SidebarProps {
  sections: SectionGetResponse[];
  completedSections?: string[];
  onSelectSection: (id: string) => void;
  isFormComplete?: boolean;
  onCompleteForm?: () => void;
}

const SectionSidebar: React.FC<SidebarProps> = ({
  sections,
  completedSections = [],
  onSelectSection,
  isFormComplete = false,
  onCompleteForm,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`
      w-64 rounded-2xl shadow-sm p-4 border
      ${LIGHT_MODE_COLORS.BACKGROUND_WHITE}
      ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}
      border-gray-200 dark:border-[#2A4C61]
    `}
    >
      <h3
        className={`
        text-xl font-semibold mb-4
        ${LIGHT_MODE_COLORS.TEXT_PRIMARY}
        ${DARK_MODE_COLORS.TEXT_PRIMARY}
      `}
      >
        Secciones
      </h3>

      <ul className="space-y-3">
        {sections.map((sec) => {
          const isCompleted = completedSections.includes(sec.id);

          return (
            <li key={sec.id} className="relative">
              {isCompleted && (
                <span className="absolute -left-1 -top-1 w-3 h-3 bg-green-500 rounded-full z-10"></span>
              )}
              <button
                onClick={() => onSelectSection(sec.id)}
                className={`
                w-full text-left px-4 py-2 rounded-xl font-medium
                border border-transparent
                ${
                  isCompleted
                    ? "bg-green-50 hover:bg-green-100 text-green-800 dark:bg-[#1B362A] dark:hover:bg-[#214937] dark:text-[#A0F0C7]"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-800 dark:bg-[#1B2A36] dark:hover:bg-[#213849] dark:text-[#A0CFF0]"
                }
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
              `}
              >
                {sec.title}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => navigate("/self-assessments")}
        className={`
        mt-6 text-sm hover:underline underline-offset-2
        ${LIGHT_MODE_COLORS.TEXT_SECONDARY}
        ${DARK_MODE_COLORS.TEXT_SECONDARY}
        hover:text-gray-700 dark:hover:text-[#E6EDF3]
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}
      `}
      >
        ← Volver a autoevaluaciones
      </button>
      {isFormComplete && onCompleteForm && (
        <button
          onClick={onCompleteForm}
          className={`
      w-full mt-6 py-3 px-4 text-white font-semibold rounded-xl
      bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
      transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400
    `}
        >
          ✅ Completar Evaluación
        </button>
      )}
    </div>
  );
};

export default SectionSidebar;
