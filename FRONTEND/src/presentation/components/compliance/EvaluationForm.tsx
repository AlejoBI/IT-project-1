import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveEvaluation } from "../../../application/store/compliance/complianceSlice";
import { AppDispatch, RootState } from "../../../application/store/store";
import NormativeSelector from "./NormativeSelector";
import Notification from "../common/Notification";
import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";
import Button from "../UI/Button";

interface EvaluationFormProps {
  onQuestionsUpdate: (total: number, answered: number) => void; // Prop para actualizar el progreso
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ onQuestionsUpdate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.compliance);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  const handleNormativeChange = (questions: any[]) => {
    setSelectedQuestions(questions);
    setResponses({}); // Reiniciar respuestas al cambiar la normativa
  };

  const handleResponseChange = (questionId: string, value: string) => {
    // Normalizar el valor de la respuesta
    const normalizedValue = normalizeResponse(value);

    setResponses((prev) => {
      const updatedResponses = { ...prev, [questionId]: normalizedValue };
      const validResponses = Object.values(updatedResponses).filter(
        (response) => response.trim() !== ""
      );
      onQuestionsUpdate(selectedQuestions.length, validResponses.length);
      return updatedResponses;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(responses).length === 0) {
      Notification({
        message: "Por favor, responde al menos una pregunta.",
        type: "warning",
      });
      return;
    }

    // Normalizar todas las respuestas antes de enviarlas
    const normalizedResponses = normalizeAllResponses(responses);
    dispatch(saveEvaluation({ responses: normalizedResponses }));
  };

  // Función para normalizar un valor individual
  const normalizeResponse = (value: string): string => {
    switch (value.toLowerCase()) {
      case "sí":
        return "si";
      case "no":
        return "no";
      case "parcial":
        return "parcial";
      default:
        return value; // Mantener el valor original si no coincide con ninguna opción
    }
  };

  // Función para normalizar todas las respuestas
  const normalizeAllResponses = (
    responses: { [key: string]: string }
  ): { [key: string]: string } => {
    const normalized: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(responses)) {
      normalized[key] = normalizeResponse(value);
    }
    return normalized;
  };

  return (
    <section
      className={`py-16 px-4 transition-colors 
        ${LIGHT_MODE_COLORS.BACKGROUND} 
        ${DARK_MODE_COLORS.BACKGROUND} 
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
    >
      <div
        className={`max-w-4xl mx-auto p-8 rounded-lg shadow-md 
          ${LIGHT_MODE_COLORS.BACKGROUND_COMPONENT} 
          ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}`}
      >
        <h2
          className={`text-2xl font-bold mb-6 
            ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
            ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
        >
          Evaluación Normativa
        </h2>
        {error && (
          <p
            className={`text-red-500 mb-4 
              ${ANIMATION_TIMINGS.TRANSITION_DURATION}`}
          >
            {error}
          </p>
        )}

        {/* Selector de Normativas */}
        <NormativeSelector onNormativeChange={handleNormativeChange} />

        {/* Formulario de Preguntas */}
        {selectedQuestions.length > 0 && (
          <form onSubmit={handleSubmit}>
            <h3
              className={`text-xl font-semibold mt-6 mb-4 
                ${LIGHT_MODE_COLORS.TEXT_SECONDARY} 
                ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
            >
              Preguntas de Evaluación
            </h3>
            {selectedQuestions.map((q) => (
              <div key={q.id} className="mb-4">
                <label
                  className={`block font-medium mb-2 
                    ${LIGHT_MODE_COLORS.TEXT_SECONDARY} 
                    ${DARK_MODE_COLORS.TEXT_SECONDARY}`}
                >
                  {q.question}
                </label>
                <select
                  className={`w-full p-2 border border-gray-300 rounded-md 
                    ${LIGHT_MODE_COLORS.INPUT_BACKGROUND} 
                    ${DARK_MODE_COLORS.INPUT_BACKGROUND} 
                    ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
                    ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
                  onChange={(e) => handleResponseChange(q.id, e.target.value)}
                >
                  <option value="">-- Selecciona una respuesta --</option>
                  {q.options.map((option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Botón de Envío */}
            <Button
              type="submit"
              children={loading ? "Guardando..." : "Guardar Evaluación"}
            />
          </form>
        )}
      </div>
    </section>
  );
};

export default EvaluationForm;