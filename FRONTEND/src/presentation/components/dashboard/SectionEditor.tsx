import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import QuestionEditor from "./QuestionEditor";

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
    <div className="border p-4 rounded-lg mb-4 space-y-3">
      <input
        {...register(`sections.${sectionIndex}.title`, { required: true })}
        placeholder="Título de la sección"
        className="w-full p-2 rounded-md border"
      />

      {questions.map((question, questionIndex) => (
        <div>
          <div className="flex flex-row">
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="flex text-red-500 hover:text-red-700 transition-colors"
            >
              ❌
            </button>
            <h3 className="flex text-lg font-semibold mb-2">
              Pregunta {questionIndex + 1}
            </h3>
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
        className="btn"
      >
        Agregar Pregunta
      </button>
    </div>
  );
};

export default SectionEditor;
