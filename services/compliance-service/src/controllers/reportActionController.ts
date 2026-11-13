import { Request, Response } from "express";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";
import { getFirebaseErrorMessage } from "../utils/error.js";

const reportRef = (reportId: string) => doc(firestore, "complianceReports", reportId);

export const createReportAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await getDoc(reportRef(req.params.reportId));
    if (!report.exists()) {
      res.status(404).json({ error: "Reporte no encontrado." });
      return;
    }

    const now = new Date();
    const action = await addDoc(collection(firestore, "reportActions"), {
      reportId: req.params.reportId,
      userId: report.data().userId,
      ...req.body,
      createdAt: now,
      updatedAt: now,
    });
    await addDoc(collection(firestore, "reportChanges"), {
      reportId: req.params.reportId,
      actionId: action.id,
      type: "created",
      changedFields: Object.keys(req.body),
      changedAt: now,
    });
    await addDoc(collection(firestore, "adminAuditEvents"), { actorId: req.auth?.uid ?? "unknown", action: "report.action_created", resource: "complianceReport", resourceId: req.params.reportId, createdAt: now });
    res.status(201).json({ id: action.id, message: "Acción correctiva creada." });
  } catch (error) {
    res.status(400).json({ error: getFirebaseErrorMessage(error, "Error creando la acción correctiva.") });
  }
};

export const getReportActionHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await getDocs(
      query(collection(firestore, "reportChanges"), where("reportId", "==", req.params.reportId))
    );
    const changes: Array<{ id: string; changedAt?: unknown; [key: string]: unknown }> = snapshot.docs.map(
      (change) => ({ id: change.id, ...(change.data() as Record<string, unknown>) })
    );
    changes.sort((left, right) => {
        const leftDate = new Date(String(left.changedAt)).getTime();
        const rightDate = new Date(String(right.changedAt)).getTime();
        return rightDate - leftDate;
    });
    res.status(200).json(changes);
  } catch (error) {
    res.status(400).json({ error: getFirebaseErrorMessage(error, "Error obteniendo el historial del reporte.") });
  }
};

export const getReportActions = async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await getDocs(
      query(collection(firestore, "reportActions"), where("reportId", "==", req.params.reportId))
    );
    res.status(200).json(snapshot.docs.map((action) => ({ id: action.id, ...action.data() })));
  } catch (error) {
    res.status(400).json({ error: getFirebaseErrorMessage(error, "Error obteniendo las acciones correctivas.") });
  }
};

export const updateReportAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const actionRef = doc(firestore, "reportActions", req.params.actionId);
    const action = await getDoc(actionRef);
    if (!action.exists() || action.data().reportId !== req.params.reportId) {
      res.status(404).json({ error: "Acción correctiva no encontrada." });
      return;
    }
    await updateDoc(actionRef, { ...req.body, updatedAt: new Date() });
    await addDoc(collection(firestore, "reportChanges"), {
      reportId: req.params.reportId,
      actionId: req.params.actionId,
      type: "updated",
      changedFields: Object.keys(req.body),
      changedAt: new Date(),
    });
    await addDoc(collection(firestore, "adminAuditEvents"), { actorId: req.auth?.uid ?? "unknown", action: "report.action_updated", resource: "complianceReport", resourceId: req.params.reportId, changedFields: Object.keys(req.body), createdAt: new Date() });
    res.status(200).json({ message: "Acción correctiva actualizada." });
  } catch (error) {
    res.status(400).json({ error: getFirebaseErrorMessage(error, "Error actualizando la acción correctiva.") });
  }
};
