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
import { FormSection } from "../models/formModels.js";

// Crear una nueva sección en un formulario
export const addFormSection = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sectionData = req.body;
    const formRef = doc(firestore, "evaluationForms", sectionData.formId);
    const formSnapshot = await getDoc(formRef);

    if (!formSnapshot.exists()) {
      return res.status(404).json({ error: "Formulario no encontrado." });
    }

    const sectionsRef = collection(firestore, "formSections");
    await addDoc(sectionsRef, {
      ...sectionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Sección agregada exitosamente.",
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al agregar la sección";
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener todas las secciones de un formulario
export const getFormSections = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { formId } = req.params;
  try {
    const sectionsRef = collection(firestore, "formSections");
    const snapshot = await getDocs(sectionsRef);

    const sections: FormSection[] = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<FormSection, "id">),
      }))
      .filter((section) => section.formId === formId);

    if (sections.length === 0) {
      return res.status(404).json({ error: "No se encontraron secciones." });
    }

    res.status(200).json(sections);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener las secciones";
    res.status(400).json({ error: errorMessage });
  }
};

// Actualizar una sección de un formulario
export const updateFormSection = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { sectionId } = req.params;
  try {
    const sectionRef = doc(firestore, "formSections", sectionId);
    const snapshot = await getDoc(sectionRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Sección no encontrada." });
    }

    const updateData = req.body;

    if (updateData.formId && updateData.formId !== snapshot.data().formId) {
      return res
        .status(400)
        .json({ error: "No se permite cambiar el formId." });
    }

    await updateDoc(sectionRef, {
      ...updateData,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Sección actualizada exitosamente." });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al actualizar la sección";
    res.status(400).json({ error: errorMessage });
  }
};

// Eliminar una sección y sus preguntas asociadas
export const deleteFormSection = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { sectionId } = req.params;
  try {
    const sectionRef = doc(firestore, "formSections", sectionId);
    const sectionSnapshot = await getDoc(sectionRef);

    if (!sectionSnapshot.exists()) {
      return res.status(404).json({ error: "Sección no encontrada." });
    }

    // Eliminar preguntas asociadas a esta sección
    const questionsRef = collection(firestore, "formQuestions");
    const questionsSnapshot = await getDocs(questionsRef);

    const questionsToDelete = questionsSnapshot.docs.filter(
      (doc) => doc.data().sectionId === sectionId
    );

    const deletePromises = questionsToDelete.map((questionDoc) =>
      deleteDoc(doc(firestore, "formQuestions", questionDoc.id))
    );

    await Promise.all(deletePromises);

    // Eliminar la sección
    await deleteDoc(sectionRef);

    res
      .status(200)
      .json({ message: "Sección y preguntas eliminadas exitosamente." });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] ||
      "Error al eliminar la sección y sus preguntas";
    res.status(400).json({ error: errorMessage });
  }
};
