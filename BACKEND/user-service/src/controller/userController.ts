import { Request, Response } from "express";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";
import { FIREBASE_USERS_ERRORS } from "../utils/constants.js";

// Obtener perfiles de usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersRef = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersRef);

    if (usersSnapshot.empty) {
      throw new Error("No se encontraron usuarios en Firestore.");
    }

    const users = usersSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    const firebaseError = (error as any)
      .code as keyof typeof FIREBASE_USERS_ERRORS;
    const errorMessage =
      FIREBASE_USERS_ERRORS[firebaseError] || "Error al iniciar sesión";
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
      throw new Error("No se encontraron datos del usuario en Firestore.");
    }

    res.status(200).json({
      uid: userSnapshot.id,
      ...userSnapshot.data(),
    } as {
      uid: string;
      email: string | null;
      role: string;
      createdAt: Date;
      updatedAt: Date;
    });
  } catch (error) {
    const firebaseError = (error as any)
      .code as keyof typeof FIREBASE_USERS_ERRORS;
    const errorMessage =
      FIREBASE_USERS_ERRORS[firebaseError] || "Error al iniciar sesión";
    res.status(400).json({ error: errorMessage });
  }
};

// Actualizar perfil de usuario
export const updateUser = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const updates = req.body;
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Perfil de usuario actualizado exitosamente" });
  } catch (error) {
    const firebaseError = (error as any)
      .code as keyof typeof FIREBASE_USERS_ERRORS;
    const errorMessage =
      FIREBASE_USERS_ERRORS[firebaseError] || "Error al iniciar sesión";
    res.status(400).json({ error: errorMessage });
  }
};
