import React from "react";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface ProgressTrackerProps {
  totalQuestions: number;
  answeredQuestions: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalQuestions,
  answeredQuestions,
}) => {
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <section
      className={`py-8 px-4 transition-colors 
        ${LIGHT_MODE_COLORS.BACKGROUND} 
        ${DARK_MODE_COLORS.BACKGROUND} 
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <div
        className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md 
          ${LIGHT_MODE_COLORS.BACKGROUND_COMPONENT} 
          ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}`}
      >
        <h2
          className={`text-xl font-bold mb-4 
            ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
            ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Progreso de la Evaluación
        </h2>
        <p
          className={`text-sm mb-4 
            ${LIGHT_MODE_COLORS.TEXT_SECONDARY} 
            ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
        >
          Has respondido {answeredQuestions} de {totalQuestions} preguntas.
        </p>
        <div
          className={`w-full h-2 rounded-full overflow-hidden 
            ${LIGHT_MODE_COLORS.PROGRESS_BAR_BACKGROUND} 
            ${DARK_MODE_COLORS.PROGRESS_BAR_BACKGROUND}`}
        >
          <div
            className={`h-full 
              ${LIGHT_MODE_COLORS.PROGRESS_BAR_FILL} 
              ${DARK_MODE_COLORS.PROGRESS_BAR_FILL}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;