import React from "react";
import { useNavigate } from "react-router-dom";
import { SectionGetResponse } from "../../../domain/models/types/EvaluationFormTypes";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { CheckCircle2, CircleCheck } from "lucide-react";

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
      w-full rounded-2xl shadow-sm p-4 border lg:w-64 lg:shrink-0
      ${LIGHT_MODE_COLORS.BACKGROUND_WHITE}
      ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}
       ${UI_COLORS.BORDER}
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
                <CheckCircle2 className={`absolute -left-2 -top-2 z-10 rounded-full ${UI_COLORS.SUCCESS}`} size={18} />
              )}
              <button
                type="button"
                onClick={() => onSelectSection(sec.id)}
                aria-label={`Abrir sección ${sec.title}${isCompleted ? ", completada" : ""}`}
                className={`
                w-full text-left px-4 py-2 rounded-xl font-medium
                border border-transparent
                ${
                  isCompleted
                     ? `${UI_COLORS.SUCCESS_SURFACE} ${UI_COLORS.SUCCESS}`
                     : `${UI_COLORS.TABLE_HEADER} ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}`
                }
                transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-[#729CAC]/40 focus:ring-offset-1
              `}
              >
                {sec.title}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => navigate("/self-assessments")}
        className={`
        mt-6 text-sm hover:underline underline-offset-2
        ${LIGHT_MODE_COLORS.TEXT_SECONDARY}
        ${DARK_MODE_COLORS.TEXT_SECONDARY}
         ${LIGHT_MODE_COLORS.TEXT_PRIMARY_HOVER} ${DARK_MODE_COLORS.TEXT_PRIMARY_HOVER}
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}
      `}
      >
        ← Volver a autoevaluaciones
      </button>
      {isFormComplete && onCompleteForm && (
        <button
          type="button"
          onClick={onCompleteForm}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#729CAC]/40 ${UI_COLORS.PRIMARY_BUTTON}`}
        >
          <CircleCheck size={18} /> Completar evaluación
        </button>
      )}
    </div>
  );
};

export default SectionSidebar;
