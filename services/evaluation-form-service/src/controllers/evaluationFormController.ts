import { Request, Response } from "express";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";
import { FIREBASE_ERRORS } from "../utils/constants.js";

export const createFullEvaluationForm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { regulationId, name, description, sections } = req.body;

    const regulationRef = doc(firestore, "regulations", regulationId);
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      return res
        .status(404)
        .json({ message: "La normativa especificada no existe." });
    }

    // Validar que no exista un formulario con el mismo regulationId
    const existingFormsSnapshot = await getDocs(
      collection(firestore, "evaluationForms")
    );

    const formWithSameRegulation = existingFormsSnapshot.docs.find(
      (doc) => doc.data().regulationId === regulationId
    );

    if (formWithSameRegulation) {
      return res.status(400).json({
        message: "Ya existe un formulario asociado a esta normativa.",
      });
    }

    // Crear el formulario
    const formRef = await addDoc(collection(firestore, "evaluationForms"), {
      regulationId,
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Crear secciones y preguntas
    const sectionPromises = sections.map(async (section: any) => {
      const sectionRef = await addDoc(collection(firestore, "formSections"), {
        formId: formRef.id,
        title: section.title,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const questionPromises = section.questions.map((question: any) =>
        addDoc(collection(firestore, "formQuestions"), {
          sectionId: sectionRef.id,
          text: question.text,
          type: question.type,
          options: question.options || [],
          isRequired: question.isRequired,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      await Promise.all(questionPromises);
    });

    await Promise.all(sectionPromises);

    res.status(201).json({
      message: "Formulario, secciones y preguntas creados exitosamente.",
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al crear el formulario completo";
    res.status(400).json({ error: errorMessage });
  }
};

// Crear un nuevo formulario de evaluación
export const addEvaluationForm = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const formData = req.body;

    const regulationRef = doc(firestore, "regulations", formData.regulationId);
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      return res
        .status(404)
        .json({ message: "La normativa especificada no existe." });
    }

    // Validar que no exista un formulario con el mismo regulationId
    const existingFormsSnapshot = await getDocs(
      collection(firestore, "evaluationForms")
    );

    const formWithSameRegulation = existingFormsSnapshot.docs.find(
      (doc) => doc.data().regulationId === formData.regulationId
    );

    if (formWithSameRegulation) {
      return res.status(400).json({
        message: "Ya existe un formulario asociado a esta normativa.",
      });
    }

    const formsRef = collection(firestore, "evaluationForms");
    await addDoc(formsRef, {
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Formulario de evaluación agregado exitosamente.",
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al agregar el formulario";
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener todos los formularios de evaluación
export const getEvaluationForms = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const formsRef = collection(firestore, "evaluationForms");
    const snapshot = await getDocs(formsRef);

    if (snapshot.empty) {
      return res
        .status(404)
        .json({ message: "No se encontraron formularios." });
    }

    const forms = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(forms);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener los formularios";
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener un formulario específico
export const getEvaluationForm = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const formRef = doc(firestore, "evaluationForms", id);
    const snapshot = await getDoc(formRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Formulario no encontrado." });
    }

    res.status(200).json({
      id: snapshot.id,
      ...snapshot.data(),
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener el formulario";
    res.status(400).json({ error: errorMessage });
  }
};

// Actualizar un formulario de evaluación
export const updateEvaluationForm = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const formRef = doc(firestore, "evaluationForms", id);
    const snapshot = await getDoc(formRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Formulario no encontrado." });
    }

    const updateData = req.body;

    await updateDoc(formRef, {
      ...updateData,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Formulario actualizado exitosamente." });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al actualizar el formulario";
    res.status(400).json({ error: errorMessage });
  }
};

// Eliminar un formulario de evaluación, sus secciones y preguntas asociadas
export const deleteEvaluationForm = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const formRef = doc(firestore, "evaluationForms", id);
    const formSnapshot = await getDoc(formRef);

    if (!formSnapshot.exists()) {
      return res.status(404).json({ message: "Formulario no encontrado." });
    }

    // Eliminar secciones asociadas
    const sectionsRef = collection(firestore, "formSections");
    const sectionsSnapshot = await getDocs(sectionsRef);

    const sectionsToDelete = sectionsSnapshot.docs.filter(
      (doc) => doc.data().formId === id
    );

    // Por cada sección eliminar sus preguntas y luego la sección
    const deleteSectionsAndQuestions = sectionsToDelete.map(
      async (sectionDoc) => {
        const sectionId = sectionDoc.id;

        // Eliminar preguntas asociadas a esta sección
        const questionsRef = collection(firestore, "formQuestions");
        const questionsSnapshot = await getDocs(questionsRef);

        const questionsToDelete = questionsSnapshot.docs.filter(
          (questionDoc) => questionDoc.data().sectionId === sectionId
        );

        const deleteQuestionsPromises = questionsToDelete.map((questionDoc) =>
          deleteDoc(doc(firestore, "formQuestions", questionDoc.id))
        );

        await Promise.all(deleteQuestionsPromises);

        // Eliminar la sección
        await deleteDoc(doc(firestore, "formSections", sectionId));
      }
    );

    await Promise.all(deleteSectionsAndQuestions);

    // Eliminar el formulario
    await deleteDoc(formRef);

    res.status(200).json({
      message: "Formulario, secciones y preguntas eliminadas exitosamente.",
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al eliminar el formulario";
    res.status(400).json({ error: errorMessage });
  }
};
