import { firestore } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { CreateComplianceReportParams } from "../models/complianceReportModel";

const determineComplianceStatus = (
  score: number
): "Cumple" | "Parcialmente Cumple" | "No Cumple" =>
  score >= 80 ? "Cumple" : score >= 60 ? "Parcialmente Cumple" : "No Cumple";

export const createComplianceReport = async ({
  userId,
  selfAssessmentId,
  regulationId,
  regulationName,
  formId,
  formName,
  totalScore,
  sectionScores,
}: CreateComplianceReportParams) => {
  try {
    const complianceStatus = determineComplianceStatus(totalScore);

    await addDoc(collection(firestore, "complianceReports"), {
      userId,
      selfAssessmentId,
      regulationId,
      regulationName,
      formId,
      formName,
      complianceStatus,
      totalScore,
      sectionScores,
      createdAt: new Date(),
    });
  } catch (error) {
    throw new Error("Error al crear compliance report");
  }
};
