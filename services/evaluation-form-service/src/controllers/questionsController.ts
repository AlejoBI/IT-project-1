import { Request, Response } from "express";
import { firestore } from "../utils/firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { FIREBASE_ERRORS } from "../utils/constants.js";
import { FormQuestion } from "../models/formModels.js";

// Crear una nueva pregunta
export const addFormQuestion = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const questionData = req.body;

    const sectionRef = doc(firestore, "formSections", questionData.sectionId);
    const sectionSnapshot = await getDoc(sectionRef);

    if (!sectionSnapshot.exists()) {
      return res.status(404).json({ error: "Sección no encontrada." });
    }

    const questionsRef = collection(firestore, "formQuestions");
    await addDoc(questionsRef, {
      ...questionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Pregunta agregada exitosamente.",
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al agregar la pregunta";
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener todas las preguntas de una sección
export const getFormQuestions = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { sectionId } = req.params;
  try {
    const questionsRef = collection(firestore, "formQuestions");
    const snapshot = await getDocs(questionsRef);

    const questions: FormQuestion[] = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<FormQuestion, "id">),
      }))
      .filter((question) => question.sectionId === sectionId);

    if (questions.length === 0) {
      return res.status(404).json({ error: "No se encontraron preguntas." });
    }

    res.status(200).json(questions);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener las preguntas";
    res.status(400).json({ error: errorMessage });
  }
};

// Actualizar una pregunta de una sección
export const updateFormQuestion = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { questionId } = req.params;
  try {
    const questionRef = doc(firestore, "formQuestions", questionId);
    const snapshot = await getDoc(questionRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Pregunta no encontrada." });
    }

    const updateData = req.body;

    await updateDoc(questionRef, {
      ...updateData,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Pregunta actualizada exitosamente." });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al actualizar la pregunta";
    res.status(400).json({ error: errorMessage });
  }
};

// Eliminar una pregunta de una sección
export const deleteFormQuestion = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { questionId } = req.params;
  try {
    const questionRef = doc(firestore, "formQuestions", questionId);
    const snapshot = await getDoc(questionRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Pregunta no encontrada." });
    }

    await deleteDoc(questionRef);
    res.status(200).json({ message: "Pregunta eliminada exitosamente." });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al eliminar la pregunta";
    res.status(400).json({ error: errorMessage });
  }
};
