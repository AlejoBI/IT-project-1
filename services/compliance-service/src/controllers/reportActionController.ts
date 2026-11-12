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
    res.status(201).json({ id: action.id, message: "Acción correctiva creada." });
  } catch (error) {
    res.status(400).json({ error: getFirebaseErrorMessage(error, "Error creando la acción correctiva.") });
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
    res.status(200).json({ message: "Acción correctiva actualizada." });
  } catch (error) {
    res.status(400).json({ error: getFirebaseErrorMessage(error, "Error actualizando la acción correctiva.") });
  }
};
