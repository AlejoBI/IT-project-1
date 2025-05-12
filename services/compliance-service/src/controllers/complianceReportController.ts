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

export const getComplianceReportsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.params;

    const q = query(
      collection(firestore, "complianceReports"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No hay autoevaluaciones completadas." });
    }
    
    const reports = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(reports);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error obteniendo información.";
    res.status(400).json({ error: errorMessage });
  }
};
