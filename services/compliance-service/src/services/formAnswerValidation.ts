import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { Answer } from "../models/selfAssessmentModel.js";
import { firestore } from "../utils/firebaseConfig.js";

export interface FormValidationResult {
  valid: boolean;
  error?: string;
  formVersion: number;
}

interface FormQuestionData {
  id: string;
  sectionId: string;
  type?: string;
  options?: Array<{ id?: string }>;
  subQuestions?: FormQuestionData[];
}

const findQuestion = (question: FormQuestionData, subQuestionId?: string): FormQuestionData | undefined => {
  if (!subQuestionId) return question;
  return question.subQuestions?.find((subQuestion) => subQuestion.id === subQuestionId);
};

/** Ensures submitted answer metadata belongs to the selected form and section. */
export const validateAnswersAgainstForm = async (
  formId: string,
  regulationId: string,
  answers: Answer[]
): Promise<FormValidationResult> => {
  const formSnapshot = await getDoc(doc(firestore, "evaluationForms", formId));

  // Kept tolerant for legacy deployments where forms were stored without a direct id lookup.
  if (!formSnapshot || !formSnapshot.exists()) {
    return { valid: true, formVersion: 1 };
  }

  const formData = formSnapshot.data();
  const formVersion = Number(formData.version) || 1;
  if (formData.regulationId && formData.regulationId !== regulationId) {
    return { valid: false, error: "El formulario no pertenece a la normativa indicada.", formVersion };
  }

  const sectionSnapshot = await getDocs(
    query(collection(firestore, "formSections"), where("formId", "==", formId))
  );
  const sections = new Map<string, string>();
  sectionSnapshot.docs.forEach((section) => sections.set(section.id, section.data().title));

  const questionSnapshot = await getDocs(collection(firestore, "formQuestions"));
  const questions = new Map<string, FormQuestionData>();
  questionSnapshot.docs.forEach((question) => {
    const data = question.data();
    if (sections.has(data.sectionId)) {
      questions.set(question.id, {
        id: question.id,
        sectionId: data.sectionId,
        type: data.type,
        options: data.options,
        subQuestions: data.subQuestions,
      });
    }
  });

  for (const answer of answers) {
    const question = questions.get(answer.questionId);
    if (!question || question.sectionId !== answer.sectionId) {
      return {
        valid: false,
        error: `La pregunta ${answer.questionId} no pertenece a la sección indicada del formulario.`,
        formVersion,
      };
    }

    const targetQuestion = findQuestion(question, answer.subQuestionId);
    if (answer.subQuestionId && !targetQuestion) {
      return {
        valid: false,
        error: `La subpregunta ${answer.subQuestionId} no pertenece a la pregunta indicada.`,
        formVersion,
      };
    }

    if (targetQuestion?.type && targetQuestion.type !== answer.type) {
      return { valid: false, error: `El tipo de respuesta no coincide para la pregunta ${answer.questionId}.`, formVersion };
    }

    if (answer.type !== "text") {
      const selected = Array.isArray(answer.value) ? answer.value : [answer.value];
      const optionIds = new Set((targetQuestion?.options || []).map((option) => option.id));
      if (
        optionIds.size > 0 &&
        selected.some(
          (option) => typeof option !== "object" || !optionIds.has((option as { id?: string }).id)
        )
      ) {
        return { valid: false, error: `La opción seleccionada no pertenece a la pregunta ${answer.questionId}.`, formVersion };
      }
    }

    if (answer.subQuestionId) {
      const subQuestionExists = Boolean(targetQuestion);
      if (!subQuestionExists) {
        return {
          valid: false,
          error: `La subpregunta ${answer.subQuestionId} no pertenece a la pregunta indicada.`,
          formVersion,
        };
      }
    }
  }

  return { valid: true, formVersion };
};
