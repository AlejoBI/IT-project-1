import { Request, Response } from 'express';
import { doc, getDoc, updateDoc, collection, getDocs, deleteDoc, addDoc} from 'firebase/firestore';
import { firestore } from '../utils/firebaseConfig.js'; 
import { FIREBASE_AUTH_ERRORS } from '../utils/constants.js';


// Agregar una nueva normativa
export const addRegulation = async (req: Request, res: Response) => {
  const { name, description, version } = req.body;

  try {
    // Referencia a la colección 'regulations'
    const regulationsRef = collection(firestore, 'regulations');

    // Agregar un nuevo documento con los datos proporcionados
    const newRegulation = await addDoc(regulationsRef, {
      name,
      description,
      version,
      createdAt: new Date(),
    });

    // Responder con el ID del nuevo documento creado
    res.status(201).json({
      message: 'Normativa agregada exitosamente.',
      id: newRegulation.id,
    });
  } catch (error: any) {
    console.error('Error al agregar la normativa:', error);
    res.status(500).json({
      message: 'Error interno al agregar la normativa.',
      error: error.message,
    });
  }
};
// Obtener todas las normativas
export const getRegulations = async (req: Request, res: Response) => {
  try {
    const regulationsRef = collection(firestore, 'regulations');
    const regulationsSnapshot = await getDocs(regulationsRef);

    if (regulationsSnapshot.empty) {
      throw new Error('No se encontraron normativas en Firestore.');
    }

    const regulations = regulationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(regulations); // Retorna todas las normativas al cliente
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_AUTH_ERRORS;
    const errorMessage = FIREBASE_AUTH_ERRORS[firebaseError] || 'Error al obtener las normativas';
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener una normativa específica
export const getRegulation = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtenemos el ID de la normativa
  try {
    const regulationRef = doc(firestore, 'regulations', id); // Obtenemos el documento de Firestore
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      // Si no existe la normativa, retornamos un error 404
      return res.status(404).json({ message: 'Normativa no encontrada.' });
    }

    // Si la normativa existe, la devolvemos en la respuesta
    res.status(200).json({
      id: regulationSnapshot.id,
      ...regulationSnapshot.data(),
    });
  } catch (error: any) {
    // Ahora TypeScript sabe que error es de tipo any
    console.error('Error al obtener la normativa:', error);
    res.status(500).json({
      message: 'Error interno al obtener la normativa.',
      error: error.message, // Incluye detalles del error para depuración
    });
  }
};


// Actualizar una normativa
export const updateRegulation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, version } = req.body;

  // Validación de datos
  if (!name || !description || !version) {
    return res.status(400).json({
      message: 'Todos los campos (name, description, version) son requeridos.',
    });
  }

  try {
    const regulationRef = doc(firestore, 'regulations', id);
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      return res.status(404).json({ message: 'Normativa no encontrada.' });
    }

    await updateDoc(regulationRef, {
      name,
      description,
      version,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: 'Normativa actualizada exitosamente.' });
  } catch (error: any) {
    console.error('Error al actualizar la normativa:', error);
    res.status(500).json({
      message: 'Error interno al actualizar la normativa.',
      error: error.message,
    });
  }
};

// Eliminar una normativa
export const deleteRegulation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const regulationRef = doc(firestore, 'regulations', id);
    const regulationSnapshot = await getDoc(regulationRef);

    if (!regulationSnapshot.exists()) {
      return res.status(404).json({ message: 'Normativa no encontrada.' });
    }

    await deleteDoc(regulationRef);
    res.status(200).json({ message: 'Normativa eliminada exitosamente.' });
  } catch (error: any) {
    console.error('Error al eliminar la normativa:', error);
    res.status(500).json({
      message: 'Error interno al eliminar la normativa.',
      error: error.message,
    });
  }
};