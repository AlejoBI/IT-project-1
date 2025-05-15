import { Request, Response } from "express";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
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
      userId: doc.id,
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
  const { userId } = req.params;
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({
      userId: userSnapshot.id,
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
  const { userId } = req.params;
  const updates = req.body;
  try {
    const userRef = doc(firestore, "users", userId);

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

// Obtener usuarios con cantidad de evalauciones y auditorias
export const getUsersWithEvaluationsAndAudits = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const usersRef = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersRef);

    if (usersSnapshot.empty) {
      return res.status(404).json({ error: "No se encontraron usuarios." });
    }

    const usersWithCounts = await Promise.all(
      usersSnapshot.docs.map(async (userDoc) => {
        const userId = userDoc.id;

        const evaluationsQuery = query(
          collection(firestore, "selfAssessments"),
          where("userId", "==", userId)
        );
        const evaluationsSnapshot = await getDocs(evaluationsQuery);
        const evaluationsCount = evaluationsSnapshot.size;

        if (evaluationsCount === 0) {
          return null;
        }

        const auditsQuery = query(
          collection(firestore, "audits"),
          where("userId", "==", userId)
        );
        const auditsSnapshot = await getDocs(auditsQuery);
        const auditsCount = auditsSnapshot.size;

        return {
          userId,
          ...userDoc.data(),
          evaluationsCount,
          auditsCount,
        };
      })
    );

    // Filtrar usuarios que no tienen evaluaciones
    const filteredUsers = usersWithCounts.filter((user) => user !== null);

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener los usuarios";
    res.status(400).json({ error: errorMessage });
  }
};
