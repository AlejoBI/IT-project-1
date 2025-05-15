import { Request, Response } from "express";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";

import { FIREBASE_ERRORS } from "../utils/constants.js";

export const createAudit = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, action } = req.body;
  try {
    const auditRef = doc(collection(firestore, "audits"));
    await setDoc(auditRef, {
      userId,
      action,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Audit created successfully" });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error creating audit";
    res.status(400).json({ error: errorMessage });
  }
};

export const getAudits = async (req: Request, res: Response): Promise<any> => {
  try {
    const auditsRef = collection(firestore, "audits");
    const auditSnapshot = await getDocs(auditsRef);
    const auditList = auditSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(auditList);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error fetching audits";
    res.status(400).json({ error: errorMessage });
  }
};
