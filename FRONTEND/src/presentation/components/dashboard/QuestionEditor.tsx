import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { QuestionType } from "../../../domain/models/types/EvaluationFormTypes";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { Plus, Trash2 } from "lucide-react";

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
        ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${UI_COLORS.BORDER}
      `}
    >
      <input
        {...register(`${basePath}.text`, { required: true })}
        placeholder="Texto de la pregunta"
          className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
      />
      <select
        {...register(`${basePath}.type`, { required: true })}
        className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
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
      {(questionType === "single-choice" || questionType === "multiple-choice") && (
        <div className="space-y-1">
          {options.map((option, optIndex) => (
            <div key={option.id} className="flex items-center gap-2">
              <input
                {...register(`${basePath}.options.${optIndex}.label`, {
                  required: true,
                })}
                placeholder={`Opción ${optIndex + 1}`}
                className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
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
                className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
              />
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => removeOption(optIndex)}
                aria-label={`Eliminar opción ${optIndex + 1}`}
                className={`rounded-lg p-2 ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE} transition-colors`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendOption({ label: "", score: 0 })}
            className={`
              ${UI_COLORS.SECONDARY_BUTTON}
              transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
              rounded-md px-3 py-1 mt-4
            `}
          >
            <Plus size={16} /> Agregar opción
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
                aria-label={`Eliminar subpregunta ${subIndex + 1}`}
                className={`rounded-lg p-2 ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE} transition-colors`}
            >
                <Trash2 size={16} />
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
        onClick={() => appendSubQuestion({ text: "", type: "text", options: [] })}
        className={`
          ${UI_COLORS.SECONDARY_BUTTON}
          transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
          rounded-md px-3 py-1 mt-4
        `}
      >
        <Plus size={16} /> Agregar subpregunta
      </button>
    </div>
  );
};

export default QuestionEditor;
