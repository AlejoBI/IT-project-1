import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

// Hooks personalizados
import { useCompliance } from "../hooks/useCompliance";
import { useEvaluation } from "../hooks/useEvaluation";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAuth } from "../hooks/useAuth";

// Componentes
import SectionSidebar from "../components/compliance/SectionSidebar";
import SectionForm from "../components/compliance/SectionForm";
import Notification from "../components/common/Notification";
import Loader from "../components/common/Loader";

// Acciones Redux
import {
  fetchSelfAssessment,
  completeSelfAssessment,
} from "../../application/store/compliance/complianceActions";
import { fetchEvaluationFormByIdAction } from "../../application/store/evaluationForm/evaluationFormActions";

// Modelos y constantes
import { SubmitSelfAssessmentRequest } from "../../domain/models/types/complianceTypes";
import { sendEmailNotification } from "../components/notification/sendEmailNotification";
import { EmailTemplateType } from "../../domain/models/types/notificationTypes";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS } from "../../shared/constants";
import Button from "../components/UI/Button";

const EvaluationFormPage = () => {
  const methods = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { regulationId } = useParams<{ regulationId: string }>();

  const { forms, loading: formLoading } = useEvaluation();
  const { message, currentDraft } = useCompliance();
  const { user } = useAuth();
  const userId = user?.uid || "";
  const urlDeploy = import.meta.env.VITE_URL_DEPLOY || "http://localhost:5173";

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Cargar formulario y borrador
  useEffect(() => {
    if (regulationId && userId) {
      dispatch(fetchEvaluationFormByIdAction(regulationId));
      dispatch(fetchSelfAssessment({ regulationId, userId }));
    }
  }, [regulationId, dispatch, userId]);

  // Validación por tipo de respuesta
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

  // Procesar borrador
  useEffect(() => {
    if (currentDraft?.answers?.length) {
      const formValues: {
        sections: {
          [key: string]: {
            answers: { [key: string]: string | string[] };
            isComplete?: boolean;
          };
        };
      } = { sections: {} };

      if (currentDraft.completedSections?.length) {
        setCompletedSections(
          currentDraft.completedSections.map((s) => s.sectionId)
        );
      }

      currentDraft.answers.forEach((answer) => {
        const sectionId = answer.sectionId;
        if (!formValues.sections[sectionId]) {
          formValues.sections[sectionId] = { answers: {} };
        }

        const answers = formValues.sections[sectionId].answers;
        const targetKey = answer.subQuestionId || answer.questionId;

        if (
          answer.type === "single-choice" &&
          typeof answer.value === "object" &&
          !Array.isArray(answer.value)
        ) {
          answers[targetKey] = (answer.value as { id: string }).id || "";
        } else if (
          answer.type === "multiple-choice" &&
          Array.isArray(answer.value)
        ) {
          answers[targetKey] = answer.value.map(
            (opt) => (opt as { id: string }).id
          );
        } else if (answer.type === "text" && typeof answer.value === "string") {
          answers[targetKey] = answer.value;
        }
      });

      if (forms?.sections?.length) {
        forms.sections.forEach((section) => {
          const sectionAnswers = formValues.sections[section.id]?.answers || {};
          let isComplete = true;

          for (const question of section.questions) {
            if (!validateAnswer(sectionAnswers[question.id], question.type)) {
              isComplete = false;
              break;
            }

            if (question.subQuestions) {
              for (const sub of question.subQuestions) {
                if (!validateAnswer(sectionAnswers[sub.id], sub.type)) {
                  isComplete = false;
                  break;
                }
              }
            }

            if (!isComplete) break;
          }

          formValues.sections[section.id] = {
            ...formValues.sections[section.id],
            isComplete,
          };
        });
      }

      methods.reset(formValues);

      if (!activeSectionId && forms?.sections?.length) {
        const firstWithData = Object.keys(formValues.sections)[0];
        setActiveSectionId(firstWithData || forms.sections[0].id);
      }
    }
  }, [currentDraft, methods, forms, activeSectionId]);

  const isFormComplete =
    forms?.sections?.every((section) =>
      completedSections.includes(section.id)
    ) ?? false;

  const handleCompleteForm = () => {
    if (!userId || !regulationId) return;

    const payload: SubmitSelfAssessmentRequest = {
      userId,
      regulationId,
      regulationName: forms?.name || "",
      formId: forms?.id || "",
      formName: forms?.name || "",
    };

    dispatch(completeSelfAssessment(payload));

    sendEmailNotification({
      to: user?.email || "",
      subject: "Formulario Completado",
      appName: "ISOlytics",
      currentName: user?.name || "",
      buttonText: "Ver reporte",
      buttonUrl: `${urlDeploy}/reports`,
      formTitle: forms?.name || "Formulario sin título",
      plainTextContent:
        "Has completado el formulario de autoevaluación exitosamente.",
      type: EmailTemplateType.FORM_COMPLETED,
      dispatch,
    });

    setTimeout(() => {
      navigate("/self-assessments");
    }, 3000);
  };

  if (formLoading) return <Loader />;

  if (!forms?.sections?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200">
          No hay una autoevaluación disponible por el momento.
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Puede que no se haya asignado un formulario o aún esté en preparación.
        </p>
        <Button
          onClick={() => navigate("/self-assessments")}
          children="Volver a autoevaluaciones"
        />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      {message && <Notification message={message} type="success" />}
      <div className="flex max-w-7xl mx-auto p-6 space-x-6">
        <SectionSidebar
          sections={forms.sections}
          completedSections={completedSections}
          onSelectSection={setActiveSectionId}
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
            {forms.name || "Formulario de Evaluación"}
          </h2>

          {activeSectionId ? (
            forms.sections
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
