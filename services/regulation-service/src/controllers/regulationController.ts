import { Request, Response } from "express";
import { doc, getDoc, updateDoc, collection, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";
import { getFirebaseErrorMessage } from "../utils/error.js";

// Agregar una nueva normativa
export const addRegulation = async (req: Request, res: Response): Promise<void> => {
  const { name, description, version } = req.body;
  try {
    const regulationsRef = collection(firestore, "regulations");

    await addDoc(regulationsRef, {
      name,
      description,
      version,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Normativa agregada exitosamente.",
    });
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al agregar la normativa");
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener todas las normativas
export const getRegulations = async (req: Request, res: Response): Promise<void> => {
  try {
    const regulationsRef = collection(firestore, "regulations");
    const regulationsSnapshot = await getDocs(regulationsRef);

    if (regulationsSnapshot.empty) {
      throw new Error("No se encontraron normativas en Firestore.");
    }

    const regulations = regulationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(regulations);
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al obtener las normativas");
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener una normativa específica
export const getRegulation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const regulationRef = doc(firestore, "regulations", id);
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      res.status(404).json({ error: "Normativa no encontrada." });
      return;
    }

    const regulation = {
      id: regulationSnapshot.id,
      ...regulationSnapshot.data(),
    };

    res.status(200).json(regulation);
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al obtener la normativa");
    res.status(400).json({ error: errorMessage });
  }
};

// Actualizar una normativa
export const updateRegulation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, version } = req.body;

  try {
    const regulationRef = doc(firestore, "regulations", id);
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      res.status(404).json({ error: "Normativa no encontrada." });
      return;
    }

    await updateDoc(regulationRef, {
      name,
      description,
      version,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Normativa actualizada exitosamente." });
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al actualizar la normativa");
    res.status(400).json({ error: errorMessage });
  }
};

// Eliminar una normativa
export const deleteRegulation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const regulationRef = doc(firestore, "regulations", id);
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      res.status(404).json({ error: "Normativa no encontrada." });
      return;
    }

    await deleteDoc(regulationRef);
    res.status(200).json({ message: "Normativa eliminada exitosamente." });
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al eliminar la normativa");
    res.status(400).json({ error: errorMessage });
  }
};
