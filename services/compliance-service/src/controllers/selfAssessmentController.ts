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
  getDoc,
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
    return res.status(400).json({ error: errorMessage });
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
    return res.status(400).json({ error: errorMessage });
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
      FIREBASE_ERRORS[firebaseError] || error;
    return res.status(400).json({ error: errorMessage });
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
    return res.status(400).json({ error: errorMessage });
  }
};

export const getSelfAssessmentToAuditsByUserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.params;

    const q = query(
      collection(firestore, "selfAssessments"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No hay autoevaluaciones completadas." });
    }

    // Agrupar por formId y regulationId
    const grouped: Record<string, any[]> = {};
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const { createdAt, sectionScores, ...rest } = data;
      const key = `${data.formId}_${data.regulationId}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({
        id: doc.id,
        createdAt,
        sectionScores,
        ...rest,
      });
    });

    const result = await Promise.all(
      Object.values(grouped).flatMap((group) => {
        // Ordenar cada grupo por fecha (más antigua primero)
        const sortedGroup = [...group].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });

        return sortedGroup.map(async (item, idx) => {
          const selfAssessmentId = item.id;
          const totalSections = Object.keys(item.sectionScores || {}).length;

          const auditQuery = query(
            collection(firestore, "audits"),
            where("selfAssessmentId", "==", selfAssessmentId)
          );
          const auditSnapshot = await getDocs(auditQuery);

          let auditStatus = "sin_auditar";
          if (!auditSnapshot.empty) {
            const auditDoc = auditSnapshot.docs[0].data();
            const sectionAudits = auditDoc.sectionAudits || [];
            auditStatus =
              sectionAudits.length >= totalSections
                ? "completada"
                : "en_proceso";
          }

          // Construir solo los campos visibles + auditStatus
          const { id, formId, regulationId, formName, regulationName, userId } =
            item;

          return {
            id,
            formId,
            regulationId,
            formName: `${formName} v${idx + 1}`,
            regulationName: `${regulationName} v${idx + 1}`,
            userId,
            auditStatus,
          };
        });
      })
    );

    return res.status(200).json(result);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error obteniendo información.";
    return res.status(400).json({ error: errorMessage });
  }
};

export const getSelfAssessmentByAssessmentId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { selfAssessmentId } = req.params;
    
    const selfAssessmentRef = doc(
      firestore,
      "selfAssessments",
      selfAssessmentId
    );
    const snapshot = await getDoc(selfAssessmentRef);

    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ error: "No hay autoevaluaciones completadas con ese ID." });
    }

    const selfAssessment = snapshot.data();

    return res.status(200).json({
      id: snapshot.id,
      ...selfAssessment,
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error obteniendo información.";
    return res.status(400).json({ error: errorMessage });
  }
};
