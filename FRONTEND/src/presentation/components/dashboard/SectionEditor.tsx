import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import QuestionEditor from "./QuestionEditor";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { Plus, Trash2 } from "lucide-react";

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
        className={`mb-4 space-y-3 rounded-xl border p-3
          sm:p-6
        ${LIGHT_MODE_COLORS.BACKGROUND} ${DARK_MODE_COLORS.BACKGROUND} ${UI_COLORS.BORDER}
      `}
    >
      <input
        {...register(`sections.${sectionIndex}.title`, { required: true })}
        placeholder="Título de la sección"
        className={`w-full ${UI_COLORS.CONTROL} ${UI_COLORS.FOCUS} p-2`}
      />

      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <div className="mb-2 flex items-center gap-2">
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
              aria-label={`Eliminar pregunta ${questionIndex + 1}`}
              className={`rounded-lg p-2 ${UI_COLORS.DANGER} ${UI_COLORS.DANGER_SURFACE} transition-colors`}
            >
              <Trash2 size={17} />
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
          ${UI_COLORS.SECONDARY_BUTTON}
          transition-colors ${ANIMATION_TIMINGS.TRANSITION_DURATION}
          rounded-md px-3 py-1 mt-4
        `}
      >
          <Plus size={17} /> Agregar pregunta
      </button>
    </div>
  );
};

export default SectionEditor;
