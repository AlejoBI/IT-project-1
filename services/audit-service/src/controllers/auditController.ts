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

import { getFirebaseErrorMessage } from "../utils/error.js";

export const createOrUpdateAudit = async (req: Request, res: Response): Promise<void> => {
  const { selfAssessmentId, auditorId, auditorName, sectionAudit } = req.body;
  try {
    if (req.auth && req.auth.uid !== auditorId && req.auth.role !== "admin") {
      res.status(403).json({ error: "El auditor indicado no coincide con el usuario autenticado." });
      return;
    }
    // Verificar si la sección ya fue auditada por cualquier auditor
    const auditsQuery = query(
      collection(firestore, "audits"),
      where("selfAssessmentId", "==", selfAssessmentId),
      where("sectionAuditIds", "array-contains", sectionAudit.sectionId)
    );

    const auditsSnapshot = await getDocs(auditsQuery);

    if (!auditsSnapshot.empty) {
      res.status(409).json({
        error: "Esta sección ya fue auditada por otro auditor.",
      });
      return;
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
        auditorName,
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

    res.status(200).json({
      message: "Sección auditada correctamente.",
    });
    return;
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error creando o actualizando auditoría.");
    res.status(400).json({ error: errorMessage });
  }
};

export const getAuditsBySelfAssessmentId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { selfAssessmentId } = req.params;

    // Consulta a la colección "audits" filtrando por selfAssessmentId
    const q = query(
      collection(firestore, "audits"),
      where("selfAssessmentId", "==", selfAssessmentId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      res.status(404).json({ error: "No hay auditorías para esta evaluación." });
      return;
    }

    const audits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(audits);
    return;
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error obteniendo auditorías.");
    res.status(400).json({ error: errorMessage });
  }
};
