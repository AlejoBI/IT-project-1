import { Request, Response } from "express";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";
import { calculateScores } from "../services/calculateScores";
import { createComplianceReport } from "./complianceReportController";

export const saveDraftController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      userId,
      regulationId,
      formId,
      formVersion,
      sectionId,
      sectionTitle,
      answers,
    } = req.body;
    const docId = `${userId}_${formId}`; 
    const draftRef = doc(firestore, "selfAssessmentSessions", docId);
    const draftSnap = await getDoc(draftRef);

    if (!draftSnap.exists()) {
      await setDoc(draftRef, {
        userId,
        regulationId,
        formId,
        formVersion,
        answers,
        completedSections: [sectionId],
        status: "in_progress",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      const existing = draftSnap.data();
      const updatedAnswers = [
        ...existing.answers.filter((a: any) => a.sectionId !== sectionId),
        ...answers,
      ];

      const updatedSections = Array.from(
        new Set([...(existing.completedSections || []), sectionId])
      );

      await updateDoc(draftRef, {
        answers: updatedAnswers,
        completedSections: updatedSections,
        updatedAt: serverTimestamp(),
      });
    }

    return res.status(200).json({ message: "Avance guardado exitosamente." });
  } catch (err) {
    return res.status(500).json({
      message: "Error guardando avance",
      error: (err as Error).message,
    });
  }
};

export const getDraftController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, formId } = req.params;
    const docId = `${userId}_${formId}`;
    const draftSnap = await getDoc(
      doc(firestore, "selfAssessmentSessions", docId)
    );

    if (!draftSnap.exists()) {
      return res
        .status(404)
        .json({ message: "No hay avance guardado para este formulario." });
    }

    return res.status(200).json(draftSnap.data());
  } catch (err) {
    return res.status(500).json({
      message: "Error obteniendo avance",
      error: (err as Error).message,
    });
  }
};

export const submitSelfAssessmentController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, regulationId, regulationName, formId, formName } = req.body;
    const docId = `${userId}_${formId}`;
    const draftSnap = await getDoc(
      doc(firestore, "selfAssessmentSessions", docId)
    );

    if (!draftSnap.exists()) {
      return res
        .status(404)
        .json({ message: "No existe evaluación en progreso para enviar." });
    }

    const draft = draftSnap.data();

    if (draft.status === "completed") {
      return res
        .status(400)
        .json({ message: "Esta evaluación ya fue enviada." });
    }

    const { totalScore, sectionScores } = calculateScores(draft.answers);

    const selfAssessmentRef = doc(collection(firestore, "selfAssessments"));
    await setDoc(selfAssessmentRef, {
      userId,
      regulationId,
      regulationName,
      formId,
      formName,
      answers: draft.answers,
      totalScore,
      sectionScores,
      observations: "",
      createdAt: serverTimestamp(),
    });

    await createComplianceReport({
      userId,
      selfAssessmentId: selfAssessmentRef.id,
      regulationId,
      regulationName,
      formId,
      formName,
      totalScore,
      sectionScores,
    });

    await updateDoc(doc(firestore, "selfAssessmentSessions", docId), {
      status: "completed",
      updatedAt: serverTimestamp(),
    });

    return res
      .status(201)
      .json({ message: "Autoevaluación enviada exitosamente." });
  } catch (err) {
    return res.status(500).json({
      message: "Error al enviar evaluación",
      error: (err as Error).message,
    });
  }
};
