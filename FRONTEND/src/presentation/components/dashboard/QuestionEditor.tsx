import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { QuestionType } from "../../../domain/models/types/EvaluationFormTypes";

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
    <div className="border p-4 rounded-md space-y-2 bg-gray-50 dark:bg-gray-800">
      <input
        {...register(`${basePath}.text`, { required: true })}
        placeholder="Texto de la pregunta"
        className="w-full p-2 rounded-md border"
      />

      <select
        {...register(`${basePath}.type`, { required: true })}
        className="w-full p-2 rounded-md border"
      >
        {Object.values(QuestionType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Opciones para preguntas tipo choice */}
      {(questionType === "single-choice" ||
        questionType === "multiple-choice") && (
        <div className="space-y-1">
          {options.map((option, optIndex) => (
            <div key={optIndex} className="flex items-center gap-2">
              <input
                {...register(`${basePath}.options.${optIndex}`)} // Registra como un string directamente
                placeholder={`Opción ${optIndex + 1}`}
                className="w-full p-2 rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeOption(optIndex)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendOption("")} // Aquí, agregamos un string vacío
            className="btn-sm"
          >
            Agregar opción
          </button>
        </div>
      )}

      {/* Subpreguntas */}
      <div className="ml-4 space-y-2">
        {subQuestions.map((sub, subIndex) => (
          <div>
            <button
              type="button"
              onClick={() => removeSubQuestion(subIndex)}
              className="absolute top-0 right-0 text-red-500"
            >
              ❌
            </button>
            <QuestionEditor
              key={sub.id}
              sectionIndex={sectionIndex}
              questionIndex={subIndex}
              parentQuestionPath={basePath}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSubQuestion({ text: "", type: "text" })}
          className="btn-sm"
        >
          Agregar subpregunta
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;