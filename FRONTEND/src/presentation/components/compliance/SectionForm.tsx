import React from "react";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { SectionGetResponse } from "../../../domain/models/types/EvaluationFormTypes";
import {
  SaveDraftPayload,
} from "../../../domain/models/types/complianceTypes";
import QuestionField from "./QuestionField";
import { useAuth } from "../../hooks/useAuth";
import { useEvaluation } from "../../hooks/useEvaluation";
import { useAppDispatch } from "../../../presentation/hooks/useAppDispatch";
import { saveSelfAssessmentDraft } from "../../../application/store/compliance/complianceActions";

import {
  LIGHT_MODE_COLORS,
  DARK_MODE_COLORS,
  ANIMATION_TIMINGS,
} from "../../../shared/constants";

import { transformSectionAnswers } from "../../../shared/helpers";

interface Props {
  section: SectionGetResponse;
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

const SectionForm: React.FC<Props> = ({ section }) => {
  const { handleSubmit } = useFormContext<SectionFormData>();
  const { user } = useAuth();
  const userId = user?.uid;
  const { forms } = useEvaluation();
  const formId = forms?.id;
  const { regulationId } = useParams<{ regulationId: string }>();
  const dispatch = useAppDispatch();

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

    await dispatch(saveSelfAssessmentDraft(payload));
  };

  return (
    <form
      id={section.id}
      onSubmit={handleSubmit(onSubmit)}
      className={`
    mb-10 rounded-2xl shadow-sm p-6 border 
    ${LIGHT_MODE_COLORS.BACKGROUND_WHITE} 
    ${DARK_MODE_COLORS.BACKGROUND_COMPONENT}
    border-gray-200 dark:border-[#2A4C61]
  `}
    >
      <h3
        className={`
      text-2xl font-semibold mb-4 
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

      <div className="mt-6 text-right">
        <button
          type="submit"
          className={`
        px-6 py-2 rounded-xl shadow transition text-white 
        ${LIGHT_MODE_COLORS.BUTTON_BG} 
        ${LIGHT_MODE_COLORS.BUTTON_HOVER_BG} 
        ${DARK_MODE_COLORS.BUTTON_BG} 
        ${DARK_MODE_COLORS.BUTTON_HOVER_BG} 
        ${ANIMATION_TIMINGS.TRANSITION_DURATION}
      `}
        >
          Guardar Respuestas
        </button>
      </div>
    </form>
  );
};

export default SectionForm;
