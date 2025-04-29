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
            <div key={option.id} className="flex items-center gap-2">
              <input
                {...register(`${basePath}.options.${optIndex}.label`, {
                  required: true,
                })}
                placeholder={`Opción ${optIndex + 1}`}
                className="w-full p-2 rounded-md border"
              />
              <input
                {...register(`${basePath}.options.${optIndex}.score`, {
                  required: true,
                  min: 0,
                  max: 100,
                })}
                placeholder="Valor porcentual de la opción (0-100)"
                type="number"
                className="w-full p-2 rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeOption(optIndex)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendOption({ label: "", score: 0 })}
            className="btn-sm"
          >
            Agregar opción
          </button>
        </div>
      )}

      {/* Subpreguntas */}
      <div className="ml-4 space-y-2">
        {subQuestions.map((sub, subIndex) => (
          <div key={sub.id}>
            <div className="flex flex-row items-center gap-2">
              <button
                type="button"
                onClick={() => removeSubQuestion(subIndex)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
              <h3 className="text-lg font-semibold">
                Subpregunta {subIndex + 1}
              </h3>
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
          className="btn-sm"
        >
          Agregar subpregunta
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;
