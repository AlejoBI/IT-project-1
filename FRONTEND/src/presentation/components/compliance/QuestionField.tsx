import React from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { QuestionGetResponse } from "../../../domain/models/types/EvaluationFormTypes";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface Props {
  question: QuestionGetResponse;
  sectionId: string;
  fieldName?: string;
  isSubQuestion?: boolean; // ✅ nueva prop
}

const QuestionField: React.FC<Props> = ({
  question,
  sectionId,
  isSubQuestion = false,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const fieldName = `sections.${sectionId}.answers.${question.id}`;
  const answerValue = useWatch({ control, name: fieldName });

  const selectedOption = question.options?.find(
    (opt) => opt.id === answerValue
  );
  const shouldShowSubQuestions =
    selectedOption?.label === "Sí" || selectedOption?.label === "Parcialmente";

  const responseTypeText =
    question.type === "single-choice"
      ? "Selecciona una opción"
      : "Selecciona una o varias opciones";

  return (
    <div
      className={`mb-8 ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} rounded-lg p-4 shadow-sm`}
    >
      {/* Pregunta */}
      <label
        className={`block text-lg font-semibold mb-2 
        ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
        ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
      >
        {question.text ? question.text : "Pregunta sin texto"}
      </label>

      {/* Tipo de respuesta */}
      <p
        className={`text-sm italic mb-4 
        ${LIGHT_MODE_COLORS.TEXT_SECONDARY} 
        ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
      >
        {responseTypeText}
      </p>

      {/* SINGLE CHOICE */}
      {question.type === "single-choice" && (
        <div className="space-y-2 ml-2">
          {question.options?.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
              ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
              ${DARK_MODE_COLORS.TEXT_PRIMARY} 
              ${LIGHT_MODE_COLORS.HOVER_BG} 
              ${DARK_MODE_COLORS.HOVER_BG} 
              rounded px-2 py-1`}
            >
              <input
                type="radio"
                value={opt.id}
                {...register(fieldName, { required: true })}
                className="form-radio text-[#729CAC] focus:ring-[#729CAC]"
              />
              <span>{opt.label ? opt.label : "Opción sin texto"}</span>
            </label>
          ))}
        </div>
      )}

      {/* MULTIPLE CHOICE */}
      {question.type === "multiple-choice" && (
        <div className="space-y-2 ml-2">
          {question.options?.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
              ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
              ${DARK_MODE_COLORS.TEXT_PRIMARY} 
              ${LIGHT_MODE_COLORS.HOVER_BG} 
              ${DARK_MODE_COLORS.HOVER_BG} 
              rounded px-2 py-1`}
            >
              <input
                type="checkbox"
                value={opt.id}
                {...register(fieldName)}
                className="form-checkbox text-[#729CAC] focus:ring-[#729CAC]"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* TEXT */}
      {question.type === "text" && (
        <input
          type="text"
          {...register(fieldName, { required: true })}
          className={`w-full mt-2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 
          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} 
          ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
          focus:ring-[#729CAC]`}
          placeholder="Escribe tu respuesta aquí"
        />
      )}

      {/* ✅ Campo de evidencia solo si NO es subpregunta */}
      {!isSubQuestion && (
        <div className="mt-4">
          <label
            className={`block text-sm font-medium mb-1 
            ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
            ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
          >
            URL de evidencia (opcional)
          </label>
          <input
            type="url"
            placeholder="https://ejemplo.com/evidencia"
            {...register(`sections.${sectionId}.answers.${question.id}_url`, {
              required: false,
            })}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 
            ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} 
            ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
            focus:ring-[#729CAC]`}
          />
        </div>
      )}

      {/* Error */}
      {errors[fieldName] && (
        <p className="text-sm text-red-500 mt-2">Este campo es obligatorio.</p>
      )}

      {/* SUBPREGUNTAS */}
      {shouldShowSubQuestions &&
        question.subQuestions?.map((sub, index) => (
          <div
            key={`${question.id}-sub-${index}`}
            className="ml-6 mt-4 border-l-2 border-[#9AC4D4] dark:border-[#336E86] pl-4"
          >
            <QuestionField
              question={sub}
              sectionId={sectionId}
              fieldName={`sections.${sectionId}.answers.${sub.id}`}
              isSubQuestion={true} // ✅ Aquí se indica que es subpregunta
            />
          </div>
        ))}
    </div>
  );
};

export default QuestionField;
