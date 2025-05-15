import { Request, Response } from "express";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";

import { FIREBASE_ERRORS } from "../utils/constants.js";

export const createOrUpdateAudit = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { selfAssessmentId, auditorId, sectionAudit } = req.body;
  try {
    // Verificar si la sección ya fue auditada por cualquier auditor
    const auditsQuery = query(
      collection(firestore, "audits"),
      where("selfAssessmentId", "==", selfAssessmentId),
      where("sectionAuditIds", "array-contains", sectionAudit.sectionId)
    );

    const auditsSnapshot = await getDocs(auditsQuery);

    if (!auditsSnapshot.empty) {
      return res.status(409).json({
        error: "Esta sección ya fue auditada por otro auditor.",
      });
    }

    // Documento único por auditor + evaluación
    const auditDocId = `${selfAssessmentId}_${auditorId}`;
    const auditDocRef = doc(firestore, "audits", auditDocId);
    const auditDocSnapshot = await getDoc(auditDocRef);

    if (!auditDocSnapshot.exists()) {
      // Crear nuevo documento de auditoría con 1 sección
      await setDoc(auditDocRef, {
        selfAssessmentId,
        auditorId,
        auditedAt: new Date().toISOString(),
        sectionAudits: [sectionAudit],
        sectionAuditIds: [sectionAudit.sectionId],
      });
    } else {
      // Actualizar documento agregando la nueva sección auditada
      await updateDoc(auditDocRef, {
        auditedAt: new Date().toISOString(),
        sectionAudits: arrayUnion(sectionAudit),
        sectionAuditIds: arrayUnion(sectionAudit.sectionId),
      });
    }

    return res.status(200).json({
      message: "Sección auditada correctamente.",
    });
  } catch (error) {
    console.error("Error en createOrUpdateAudit:", error);
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] ||
      "Error creando o actualizando auditoría.";
    res.status(400).json({ error: errorMessage });
  }
};

export const getAuditsBySelfAssessmentId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { selfAssessmentId } = req.params;

    // Consulta a la colección "audits" filtrando por selfAssessmentId
    const q = query(
      collection(firestore, "audits"),
      where("selfAssessmentId", "==", selfAssessmentId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ error: "No hay auditorías para esta evaluación." });
    }

    const audits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(audits);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error obteniendo auditorías.";
    res.status(400).json({ error: errorMessage });
  }
};
