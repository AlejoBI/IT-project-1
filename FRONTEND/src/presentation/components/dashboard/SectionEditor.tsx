import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import QuestionEditor from "./QuestionEditor";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

interface SectionEditorProps {
  sectionIndex: number;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ sectionIndex }) => {
  const { register, control } = useFormContext();

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions`,
  });

  return (
    <div
      className={`border p-6 rounded-lg mb-4 space-y-3
        ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND}
      `}
    >
      <input
        {...register(`sections.${sectionIndex}.title`, { required: true })}
        placeholder="Título de la sección"
        className={`w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
          ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} ${DARK_MODE_COLORS.INPUT_BACKGROUND}
          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
        `}
      />

      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <div className="flex flex-row items-center gap-2 mb-2">
            <h3
              className={`flex text-lg font-semibold
                ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
                `}
            >
              Pregunta {questionIndex + 1}
            </h3>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="flex text-red-500 hover:text-red-700 transition-colors"
            >
              ❌
            </button>
          </div>
          <QuestionEditor
            key={question.id}
            sectionIndex={sectionIndex}
            questionIndex={questionIndex}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendQuestion({ text: "", type: "text" })}
        className={`
          ${LIGHT_MODE_COLORS.BUTTON_BG} ${DARK_MODE_COLORS.BUTTON_BG}
          ${LIGHT_MODE_COLORS.TEXT_PRIMARY} ${DARK_MODE_COLORS.TEXT_PRIMARY}
          ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} ${DARK_MODE_COLORS.BUTTON_HOVER_BG}
          border border-gray-300
          transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
          rounded-md px-3 py-1 mt-4
        `}
      >
        Agregar Pregunta
      </button>
    </div>
  );
};

export default SectionEditor;
