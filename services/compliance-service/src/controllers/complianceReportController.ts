import { Request, Response } from "express";
import { firestore } from "../utils/firebaseConfig.js";
import { FIREBASE_ERRORS } from "../utils/constants.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { CreateComplianceReportParams } from "../models/complianceReportModel.js";

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
  questionGaps = [],
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
      questionGaps,
      createdAt: new Date(),
    });
  } catch {
    throw new Error("Error al crear compliance report");
  }
};

export const getComplianceReportsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const q = query(collection(firestore, "complianceReports"), where("userId", "==", userId));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      res.status(404).json({ error: "No hay autoevaluaciones completadas." });
      return;
    }

    const reports = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(reports);
  } catch (error) {
    const firebaseCode =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code: unknown }).code)
        : "";
    const firebaseError = firebaseCode as keyof typeof FIREBASE_ERRORS;
    const errorMessage = FIREBASE_ERRORS[firebaseError] || "Error obteniendo información.";
    res.status(400).json({ error: errorMessage });
  }
};
