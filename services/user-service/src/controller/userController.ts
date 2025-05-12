import { Request, Response } from "express";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";
import { FIREBASE_ERRORS } from "../utils/constants.js";

// Obtener perfiles de usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersRef = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersRef);

    if (usersSnapshot.empty) {
      res.status(404).json({ error: "No se encontraron usuarios." });
    }

    const users = usersSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener los usuarios";
    res.status(400).json({ error: errorMessage });
  }
};

// Obtener perfil de usuario
export const getUser = async (req: Request, res: Response) => {
  const { uid } = req.params;
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({
      uid: userSnapshot.id,
      ...userSnapshot.data(),
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener el usuario";
    res.status(400).json({ error: errorMessage });
  }
};

// Actualizar perfil de usuario
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { uid } = req.params;
  const updates = req.body;
  try {
    const userRef = doc(firestore, "users", uid);

    if (!userRef) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Perfil de usuario actualizado exitosamente" });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al actualizar el perfil";
    res.status(400).json({ error: errorMessage });
  }
};
