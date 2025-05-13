import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCompliance } from "../hooks/useCompliance";
import { useEvaluation } from "../hooks/useEvaluation";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAuth } from "../hooks/useAuth";
import SectionSidebar from "../components/compliance/SectionSidebar";
import SectionForm from "../components/compliance/SectionForm";

import { fetchEvaluationFormByIdAction } from "../../application/store/evaluationForm/evaluationFormActions";
import { fetchSelfAssessment } from "../../application/store/compliance/complianceActions";
import { completeSelfAssessment } from "../../application/store/compliance/complianceActions";

import { SubmitSelfAssessmentRequest } from "../../domain/models/types/complianceTypes";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../shared/constants";
import Notification from "../components/common/Notification";

const EvaluationFormPage = () => {
  const methods = useForm();
  const { forms, loading: formLoading } = useEvaluation();
  const { message, currentDraft } = useCompliance();
  const dispatch = useAppDispatch();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const { regulationId } = useParams<{ regulationId: string }>();
  const { user } = useAuth();
  const userId = user?.uid || "";

  useEffect(() => {
    if (regulationId && userId) {
      dispatch(fetchEvaluationFormByIdAction(regulationId));
      dispatch(fetchSelfAssessment({ regulationId, userId }));
    }
  }, [regulationId, dispatch, userId]);

  // Función auxiliar para validar una respuesta según el tipo
  function validateAnswer(
    answer: string | string[] | null | undefined,
    type: string
  ): boolean {
    switch (type) {
      case "text":
        return typeof answer === "string" && answer.trim().length > 0;
      case "single-choice":
        return typeof answer === "string" && answer.length > 0;
      case "multiple-choice":
        return Array.isArray(answer) && answer.length > 0;
      default:
        return false;
    }
  }

  useEffect(() => {
    if (currentDraft?.answers && currentDraft.answers.length > 0) {
      const formValues: {
        sections: {
          [key: string]: {
            answers: { [key: string]: string | string[] };
            isComplete?: boolean;
          };
        };
      } = { sections: {} };

      // Extraer secciones completadas explícitamente del draft (si viene del backend)
      if (
        currentDraft.completedSections &&
        currentDraft.completedSections.length > 0
      ) {
        setCompletedSections(
          currentDraft.completedSections.map((section) => section.sectionId)
        );
      }

      // Procesar respuestas para armar el objeto del formulario
      currentDraft.answers.forEach((answer) => {
        if (!formValues.sections[answer.sectionId]) {
          formValues.sections[answer.sectionId] = { answers: {} };
        }

        const sectionAnswers = formValues.sections[answer.sectionId].answers;

        if (answer.type === "single-choice") {
          const selectedId =
            answer.value &&
            typeof answer.value === "object" &&
            "id" in answer.value
              ? answer.value.id
              : undefined;

          if (selectedId) {
            if (answer.subQuestionId) {
              sectionAnswers[answer.subQuestionId] = selectedId;
            } else {
              sectionAnswers[answer.questionId] = selectedId;
            }
          }
        } else if (answer.type === "multiple-choice") {
          if (Array.isArray(answer.value)) {
            const optionIds = answer.value.map((opt) => opt.id);
            if (answer.subQuestionId) {
              sectionAnswers[answer.subQuestionId] = optionIds;
            } else {
              sectionAnswers[answer.questionId] = optionIds;
            }
          }
        } else if (answer.type === "text") {
          const textValue =
            typeof answer.value === "string" ? answer.value : "";
          if (answer.subQuestionId) {
            sectionAnswers[answer.subQuestionId] = textValue;
          } else {
            sectionAnswers[answer.questionId] = textValue;
          }
        }
      });

      // Verificar qué secciones están completas según el formulario original
      if (forms?.sections && forms.sections.length > 0) {
        forms.sections.forEach((section) => {
          const sectionAnswers = formValues.sections[section.id]?.answers || {};
          let isComplete = true;

          for (const question of section.questions) {
            const mainAnswer = sectionAnswers[question.id];
            if (!validateAnswer(mainAnswer, question.type)) {
              isComplete = false;
              break;
            }

            // Verificar subpreguntas
            if (question.subQuestions) {
              for (const sub of question.subQuestions) {
                const subAnswer = sectionAnswers[sub.id];
                if (!validateAnswer(subAnswer, sub.type)) {
                  isComplete = false;
                  break;
                }
              }
            }

            if (!isComplete) break;
          }

          // Marcar como completa
          if (!formValues.sections[section.id]) {
            formValues.sections[section.id] = { answers: {}, isComplete };
          } else {
            formValues.sections[section.id].isComplete = isComplete;
          }
        });
      }

      // Cargar los valores en React Hook Form
      methods.reset(formValues);

      // Establecer la sección activa si no hay una
      if (!activeSectionId && forms?.sections && forms.sections.length > 0) {
        const firstSectionWithData = Object.keys(formValues.sections)[0];
        if (firstSectionWithData) {
          setActiveSectionId(firstSectionWithData);
        } else {
          setActiveSectionId(forms.sections[0].id);
        }
      }
    }
  }, [currentDraft, methods, forms, activeSectionId]);

  const isFormComplete =
    forms?.sections?.every((section) =>
      completedSections.includes(section.id)
    ) ?? false;

  const handleCompleteForm = () => {
    if (userId && regulationId) {
      const submitSelfAssessmentRequest: SubmitSelfAssessmentRequest = {
        userId,
        regulationId,
        regulationName: forms?.name || "",
        formId: forms?.id || "",
        formName: forms?.name || "",
      };
      dispatch(completeSelfAssessment(submitSelfAssessmentRequest));
    }
  };

  if (formLoading) return <div>Cargando...</div>;

  return (
    <FormProvider {...methods}>
      {message && <Notification message={message} type="success" />}
      <div className="flex max-w-7xl mx-auto p-6 space-x-6">
        <SectionSidebar
          sections={forms?.sections || []}
          completedSections={completedSections}
          onSelectSection={(id) => setActiveSectionId(id)}
          isFormComplete={isFormComplete}
          onCompleteForm={handleCompleteForm}
        />

        <div
          className={`
          flex-1 rounded-2xl shadow p-6 
          ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} 
          ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}`}
        >
          <h2
            className={`text-3xl font-bold mb-6 
            ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
            ${DARK_MODE_COLORS.TEXT_PRIMARY}`}
          >
            {forms?.name ? forms.name : "Formulario de Evaluación"}
          </h2>

          {activeSectionId ? (
            forms?.sections
              .filter((section) => section.id === activeSectionId)
              .map((section) => (
                <SectionForm key={section.id} section={section} />
              ))
          ) : (
            <div
              className={`
              p-6 border rounded-lg shadow-sm 
              ${LIGHT_MODE_COLORS.BACKGROUND_COMPONENT} 
              ${DARK_MODE_COLORS.BACKGROUND_COMPONENT} 
              border-gray-200 dark:border-[#2A4C61]
              text-gray-600 dark:text-[#A0B5C3]`}
            >
              <p className="mb-2">
                Por favor, selecciona una sección en la barra lateral para
                comenzar tu autoevaluación.
              </p>
              <p className="text-sm text-gray-500 dark:text-[#7A97A9]">
                Haz clic en el título de una sección para visualizar sus
                preguntas.
              </p>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default EvaluationFormPage;
