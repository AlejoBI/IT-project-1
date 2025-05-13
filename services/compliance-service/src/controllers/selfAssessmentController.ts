import { Request, Response } from "express";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";
import { calculateScores } from "../services/calculateScores.js";
import { createComplianceReport } from "./complianceReportController.js";
import { FIREBASE_ERRORS } from "../utils/constants.js";

export const saveDraftController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, regulationId, formId, sectionId, sectionTitle, answers } =
      req.body;

    const q = query(
      collection(firestore, "selfAssessmentSessions"),
      where("userId", "==", userId),
      where("regulationId", "==", regulationId),
      where("status", "==", "in_progress")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // no sesión activa, se crea nueva
      await addDoc(collection(firestore, "selfAssessmentSessions"), {
        userId,
        regulationId,
        formId,
        answers,
        completedSections: [{ sectionId, sectionTitle }],
        status: "in_progress",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res
        .status(201)
        .json({ message: "Nueva evaluación iniciada y avance guardado." });
    } else {
      // solo debe haber una activa, tomamos la primera
      const draftDoc = snapshot.docs[0];
      const existing = draftDoc.data();

      const updatedAnswers = [
        ...existing.answers.filter((a: any) => a.sectionId !== sectionId),
        ...answers,
      ];

      const updatedSections = Array.from(
        new Map(
          [
        ...(existing.completedSections || []),
        { sectionId, sectionTitle },
          ].map((section) => [section.sectionId, section])
        ).values()
      );

      await updateDoc(draftDoc.ref, {
        answers: updatedAnswers,
        completedSections: updatedSections,
        updatedAt: new Date(),
      });

      return res
        .status(200)
        .json({ message: "Avance actualizado exitosamente." });
    }
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error guardando avance.";
    res.status(400).json({ error: errorMessage });
  }
};

export const getDraftController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, regulationId } = req.params;

    const q = query(
      collection(firestore, "selfAssessmentSessions"),
      where("userId", "==", userId),
      where("regulationId", "==", regulationId),
      where("status", "==", "in_progress")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No hay avance guardado para esta normativa." });
    }

    return res.status(200).json(snapshot.docs[0].data());
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error obteniendo avance.";
    res.status(400).json({ error: errorMessage });
  }
};

export const submitSelfAssessmentController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, regulationId, regulationName, formId, formName } = req.body;

    const q = query(
      collection(firestore, "selfAssessmentSessions"),
      where("userId", "==", userId),
      where("regulationId", "==", regulationId),
      where("status", "==", "in_progress")
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No existe evaluación en progreso para enviar." });
    }

    const draftDoc = snapshot.docs[0];
    const draft = draftDoc.data();

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
      createdAt: new Date(),
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

    await updateDoc(draftDoc.ref, {
      status: "completed",
      updatedAt: new Date(),
    });

    return res
      .status(200)
      .json({ message: "Autoevaluación enviada exitosamente." });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error enviando autoevaluación.";
    res.status(400).json({ error: errorMessage });
  }
};

export const getSelfAssessmentController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.params;

    const q = query(
      collection(firestore, "selfAssessmentSessions"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No hay autoevaluaciones completadas o iniciadas." });
    }

    const selfAssessmentsSessions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(selfAssessmentsSessions);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error obteniendo información.";
    res.status(400).json({ error: errorMessage });
  }
};
