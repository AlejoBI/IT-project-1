import { Request, Response } from "express";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";
import { FIREBASE_ERRORS } from "../utils/constants.js";
import {
  EvaluationForm,
  FormSection,
  FormQuestion,
} from "../models/formModels.js";

import { uid } from "uid";

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
        .json({ error: "La normativa especificada no existe." });
    }

    // Validar duplicado por regulationId
    const existingFormsSnapshot = await getDocs(
      collection(firestore, "evaluationForms")
    );
    const formWithSameRegulation = existingFormsSnapshot.docs.find(
      (doc) => doc.data().regulationId === regulationId
    );

    if (formWithSameRegulation) {
      return res.status(400).json({
        error: "Ya existe un formulario asociado a esta normativa.",
      });
    }

    // Crear el formulario
    const now = new Date();
    const formData: EvaluationForm = {
      regulationId,
      name,
      description,
      createdAt: now,
      updatedAt: now,
    };

    const formRef = await addDoc(
      collection(firestore, "evaluationForms"),
      formData
    );

    // Crear secciones y preguntas en paralelo
    await Promise.all(
      sections.map(async (section: any) => {
        const sectionData: FormSection = {
          formId: formRef.id,
          title: section.title,
          createdAt: now,
          updatedAt: now,
        };

        const sectionRef = await addDoc(
          collection(firestore, "formSections"),
          sectionData
        );

        await Promise.all(
          section.questions.map((question: any) => {
            const questionData: FormQuestion = {
              sectionId: sectionRef.id,
              text: question.text,
              type: question.type,
              options: (question.options || []).map((option: any) => ({
                id: uid(25),
                ...option,
              })),
              subQuestions: (question.subQuestions || []).map((sub: any) => ({
                id: uid(25),
                ...sub,
                options: (sub.options || []).map((subOption: any) => ({
                  id: uid(25),
                  ...subOption,
                })),
              })),
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            return addDoc(collection(firestore, "formQuestions"), questionData);
          })
        );
      })
    );

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

// Crear un nuevo formulario de evaluación individualmente sin secciones y preguntas
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
        .json({ error: "La normativa especificada no existe." });
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
        error: "Ya existe un formulario asociado a esta normativa.",
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

// Obtener un formulario específico con secciones y preguntas
export const getEvaluationFormByRegulationId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { regulationId } = req.params;

  try {
    const formQuery = query(
      collection(firestore, "evaluationForms"),
      where("regulationId", "==", regulationId)
    );
    const formSnapshot = await getDocs(formQuery);

    if (formSnapshot.empty) {
      return res.status(404).json({ error: "Formulario no encontrado." });
    }

    const formData = formSnapshot.docs[0].data();
    const formId = formSnapshot.docs[0].id;

    // Obtener secciones asociadas al formulario
    const sectionQuery = query(
      collection(firestore, "formSections"),
      where("formId", "==", formId)
    );
    const sectionsSnapshot = await getDocs(sectionQuery);

    const sections = await Promise.all(
      sectionsSnapshot.docs.map(async (sectionDoc) => {
        const sectionData = sectionDoc.data();
        const sectionId = sectionDoc.id;

        // Obtener preguntas asociadas a la sección
        const questionsQuery = query(
          collection(firestore, "formQuestions"),
          where("sectionId", "==", sectionId)
        );
        const questionsSnapshot = await getDocs(questionsQuery);

        const questions = questionsSnapshot.docs.map((questionDoc) => ({
          id: questionDoc.id,
          ...questionDoc.data(),
        }));

        return {
          id: sectionId,
          ...sectionData,
          questions,
        };
      })
    );

    res.status(200).json({
      id: formId,
      ...formData,
      sections,
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
      return res.status(404).json({ error: "Formulario no encontrado." });
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
export const deleteEvaluationFormByRegulationId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { regulationId } = req.params;

  try {
    // Paso 1: Buscar el formulario por regulationId
    const formQuery = query(
      collection(firestore, "evaluationForms"),
      where("regulationId", "==", regulationId)
    );
    const formSnapshot = await getDocs(formQuery);

    if (formSnapshot.empty) {
      return res.status(404).json({ error: "Formulario no encontrado." });
    }

    const formDoc = formSnapshot.docs[0];
    const formId = formDoc.id;

    // Paso 2: Obtener secciones del formulario
    const sectionsQuery = query(
      collection(firestore, "formSections"),
      where("formId", "==", formId)
    );
    const sectionsSnapshot = await getDocs(sectionsQuery);

    await Promise.all(
      sectionsSnapshot.docs.map(async (sectionDoc) => {
        const sectionId = sectionDoc.id;

        // Paso 3: Obtener y eliminar preguntas asociadas a esta sección
        const questionsQuery = query(
          collection(firestore, "formQuestions"),
          where("sectionId", "==", sectionId)
        );
        const questionsSnapshot = await getDocs(questionsQuery);
        
        await Promise.all(
          questionsSnapshot.docs.map((questionDoc) =>
            deleteDoc(doc(firestore, "formQuestions", questionDoc.id))
          )
        );

        // Paso 4: Eliminar la sección
        await deleteDoc(doc(firestore, "formSections", sectionId));
      })
    );

    // Paso 5: Eliminar el formulario
    await deleteDoc(doc(firestore, "evaluationForms", formId));

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
