import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { QuestionType } from "../../../domain/models/types/EvaluationFormTypes";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface QuestionEditorProps {
  sectionIndex: number;
  questionIndex: number;
  parentQuestionPath?: string;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  sectionIndex,
  questionIndex,
  parentQuestionPath,
}) => {
  const { register, control, watch } = useFormContext();

  const basePath = parentQuestionPath
    ? `${parentQuestionPath}.subQuestions.${questionIndex}`
    : `sections.${sectionIndex}.questions.${questionIndex}`;

  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `${basePath}.options`,
  });

  const {
    fields: subQuestions,
    append: appendSubQuestion,
    remove: removeSubQuestion,
  } = useFieldArray({
    control,
    name: `${basePath}.subQuestions`,
  });

  const questionType = watch(`${basePath}.type`);

  return (
    <div
      className={`border p-6 rounded-md space-y-2
        ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND}
      `}
    >
      <input
        {...register(`${basePath}.text`, { required: true })}
        placeholder="Texto de la pregunta"
        className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
          border-gray-300
        `}
      />
      <select
        {...register(`${basePath}.type`, { required: true })}
        className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
          border-gray-300
        `}
      >
        {Object.values(QuestionType).map((type) => (
          <option key={type} value={type}>
            {type === "single-choice"
              ? "Opción única"
              : type === "multiple-choice"
              ? "Opción múltiple"
              : "Respuesta de texto"}
          </option>
        ))}
      </select>

      {/* Opciones para preguntas tipo choice */}
      {(questionType === "single-choice" ||
        questionType === "multiple-choice") && (
        <div className="space-y-1">
          {options.map((option, optIndex) => (
            <div key={option.id} className="flex items-center gap-2">
              <input
                {...register(`${basePath}.options.${optIndex}.label`, {
                  required: true,
                })}
                placeholder={`Opción ${optIndex + 1}`}
                className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                  ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                  border-gray-300
                `}
              />
              <input
                {...register(`${basePath}.options.${optIndex}.score`, {
                  required: true,
                  min: 0,
                  max: 100,
                  valueAsNumber: true,
                })}
                placeholder="Valor porcentual de la opción (0-100)"
                type="number"
                className={`w-full p-2 rounded-md border
                  ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND}
                  ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                  border-gray-300
                `}
              />
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => removeOption(optIndex)}
                className={`text-red-500 hover:text-red-700 transition-colors
                  ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                `}
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendOption({ label: "", score: 0 })}
            className={`
              ${LIGHT_MODE_COLORS.BUTTON_BG} ${DARK_MODE_COLORS.BUTTON_BG}
              ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
              ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} ${DARK_MODE_COLORS.BUTTON_HOVER_BG}
              border border-gray-300
              transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
              rounded-md px-3 py-1 mt-4
            `}
          >
            Agregar opción
          </button>
        </div>
      )}

      {/* Subpreguntas */}
      {subQuestions.map((sub, subIndex) => (
        <div
          key={sub.id}
          className={`mt-4
          ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND}
        `}
        >
          <div className="flex flex-row items-center gap-2">
            <h3
              className={`flex text-lg font-semibold
                ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                `}
            >
              Subpregunta {subIndex + 1}
            </h3>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => removeSubQuestion(subIndex)}
              className={`text-red-500 hover:text-red-700 transition-colors
                ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                `}
            >
              ❌
            </button>
          </div>
          <QuestionEditor
            sectionIndex={sectionIndex}
            questionIndex={subIndex}
            parentQuestionPath={basePath}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendSubQuestion({ text: "", type: "text", options: [] })
        }
        className={`
          ${LIGHT_MODE_COLORS.BUTTON_BG} ${DARK_MODE_COLORS.BUTTON_BG}
          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
          ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} ${DARK_MODE_COLORS.BUTTON_HOVER_BG}
          border border-gray-300
          transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
          rounded-md px-3 py-1 mt-4
        `}
      >
        Agregar subpregunta
      </button>
    </div>
  );
};

export default QuestionEditor;
