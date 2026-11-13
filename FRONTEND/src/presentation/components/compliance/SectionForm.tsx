import React from "react";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { SectionGetResponse } from "../../../domain/models/types/EvaluationFormTypes";
import { SaveDraftPayload } from "../../../domain/models/types/complianceTypes";
import QuestionField from "./QuestionField";
import { useAuth } from "../../hooks/useAuth";
import { useEvaluation } from "../../hooks/useEvaluation";
import { useAppDispatch } from "../../../presentation/hooks/useAppDispatch";
import { saveSelfAssessmentDraft } from "../../../application/store/compliance/complianceActions";

import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, ANIMATION_TIMINGS, UI_COLORS } from "../../../shared/constants";
import { Save } from "lucide-react";

import { transformSectionAnswers } from "../../../shared/helpers";
import { sendEmailNotification } from "../notification/sendEmailNotification";
import { EmailTemplateType } from "../../../domain/models/types/notificationTypes";

interface Props {
  section: SectionGetResponse;
  onSaved?: (sectionId: string) => void | Promise<void>;
}

interface SectionFormData {
  sections: {
    [sectionId: string]: {
      answers: {
        [questionOrSubQuestionId: string]: string | string[];
      };
    };
  };
}

const SectionForm: React.FC<Props> = ({ section, onSaved }) => {
  const { handleSubmit } = useFormContext<SectionFormData>();
  const { user } = useAuth();
  const userId = user?.uid;
  const { forms } = useEvaluation();
  const formId = forms?.id;
  const { regulationId } = useParams<{ regulationId: string }>();
  const dispatch = useAppDispatch();
  const urlDeploy = import.meta.env.VITE_URL_DEPLOY || "http://localhost:5173";

  const onSubmit = async (data: SectionFormData) => {
    const sectionAnswers = data.sections?.[section.id]?.answers || {};
    const answers = transformSectionAnswers(section, sectionAnswers);

    if (!userId || !regulationId || !formId) {
      return;
    }

    const payload: SaveDraftPayload = {
      userId,
      regulationId,
      formId,
      sectionId: section.id,
      sectionTitle: section.title,
      answers,
    };

    // La notificación solo se envía cuando el guardado fue aceptado por el backend.
    // Así evitamos encadenar un POST de notificaciones después de un 422.
    await dispatch(saveSelfAssessmentDraft(payload)).unwrap();
    await onSaved?.(section.id);
    sendEmailNotification({
      to: user.email || "",
      subject: "Sección Actualizada",
      appName: "ISOlytics",
      currentName: user.name || "",
      buttonText: "Continuar evaluación",
      buttonUrl: `${urlDeploy}/evaluation`,
      sectionTitle: section.title || "Sección sin título",
      formTitle: forms?.name || "Formulario sin título",
      plainTextContent: "Has realizado un avance de una sección del formulario.",
      type: EmailTemplateType.SECTION_COMPLETED,
      dispatch,
    });
  };

  return (
    <form
      id={section.id}
      onSubmit={handleSubmit(async (e) => {
        await onSubmit(e);
      })}
      className={`
       mb-6 rounded-2xl border p-4 shadow-sm sm:mb-10 sm:p-6
    ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} 
    ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}
    ${UI_COLORS.BORDER}
    `}
    >
      <h3
        className={`
       mb-4 text-xl font-semibold sm:text-2xl
      ${LIGHT_MODE_COLORS.TEXT_PRIMARY} 
      ${DARK_MODE_COLORS.TEXT_PRIMARY}
    `}
      >
        {section.title ? section.title : "Sección sin título"}
      </h3>

      <div className="space-y-6">
        {section.questions.map((q) => (
          <QuestionField key={q.id} question={q} sectionId={section.id} />
        ))}
      </div>

      <div className="mt-6 flex justify-stretch sm:justify-end">
        <button
          type="submit"
          className={`
      inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 shadow transition text-white sm:w-auto
      ${LIGHT_MODE_COLORS.BUTTON_BG} 
      ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} 
      ${DARK_MODE_COLORS.BUTTON_BG} 
      ${DARK_MODE_COLORS.BUTTON_HOVER_BG} 
      ${ANIMATION_TIMINGS.TRANSITION_DURATION} ${UI_COLORS.PRIMARY_BUTTON}
      `}
        >
          <Save size={17} /> Guardar y continuar
        </button>
      </div>
    </form>
  );
};

export default SectionForm;
