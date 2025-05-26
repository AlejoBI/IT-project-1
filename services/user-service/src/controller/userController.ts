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
export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const usersRef = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersRef);

    if (usersSnapshot.empty) {
      return res.status(404).json({ error: "No se encontraron usuarios." });
    }

    const users = usersSnapshot.docs.map((doc) => ({
      userId: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(users);
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener los usuarios";
    return res.status(400).json({ error: errorMessage });
  }
};

// Obtener perfil de usuario
export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { uid } = req.params;

  try {
    const userRef = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Obtener evaluaciones del usuario
    const evaluationsQuery = query(
      collection(firestore, "selfAssessments"),
      where("userId", "==", uid)
    );
    const evaluationsSnapshot = await getDocs(evaluationsQuery);
    const evaluationsCount = evaluationsSnapshot.size;

    // Si no hay evaluaciones, respondemos directamente
    if (evaluationsCount === 0) {
      return res.status(200).json({
        userId: userSnapshot.id,
        ...userSnapshot.data(),
        evaluationsCount: 0,
        auditsCount: 0,
        evaluationsAverage: null,
      });
    }

    // Procesar auditorías si hay evaluaciones
    const evaluationsDocs = evaluationsSnapshot.docs;

    const auditsCountPromises = evaluationsDocs.map(async (evalDoc) => {
      const selfAssessmentId = evalDoc.id;
      const auditsQuery = query(
        collection(firestore, "audits"),
        where("selfAssessmentId", "==", selfAssessmentId)
      );
      const auditsSnapshot = await getDocs(auditsQuery);
      return auditsSnapshot.size;
    });

    const auditsCounts = await Promise.all(auditsCountPromises);
    const auditsCount = auditsCounts.reduce((acc, count) => acc + count, 0);

    // Obtener promedio de cumplimiento si hay
    const complianceReportsQuery = query(
      collection(firestore, "complianceReports"),
      where("userId", "==", uid)
    );
    const complianceReportsSnapshot = await getDocs(complianceReportsQuery);

    let evaluationsAverage: number | null = null;
    if (!complianceReportsSnapshot.empty) {
      const totalScores: number[] = [];
      complianceReportsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (typeof data.totalScore === "number") {
          totalScores.push(data.totalScore);
        }
      });
      if (totalScores.length > 0) {
        const sum = totalScores.reduce((acc, val) => acc + val, 0);
        evaluationsAverage = sum / totalScores.length;
      }
    }

    return res.status(200).json({
      userId: userSnapshot.id,
      ...userSnapshot.data(),
      evaluationsCount,
      auditsCount,
      evaluationsAverage,
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener el usuario";
    return res.status(500).json({ error: errorMessage });
  }
};

// Actualizar perfil de usuario
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });

    return res
      .status(200)
      .json({ message: "Perfil de usuario actualizado exitosamente" });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al actualizar el perfil";
    return res.status(400).json({ error: errorMessage });
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

        // Buscar evaluaciones del usuario
        const evaluationsQuery = query(
          collection(firestore, "selfAssessments"),
          where("userId", "==", userId)
        );
        const evaluationsSnapshot = await getDocs(evaluationsQuery);
        const evaluations = evaluationsSnapshot.docs;

        if (evaluations.length === 0) {
          return null;
        }

        // Para cada evaluación, buscar si hay audits con selfAssessmentId igual al id de la evaluación
        const auditsCounts = await Promise.all(
          evaluations.map(async (evalDoc) => {
            const selfAssessmentId = evalDoc.id;
            const auditsQuery = query(
              collection(firestore, "audits"),
              where("selfAssessmentId", "==", selfAssessmentId)
            );
            const auditsSnapshot = await getDocs(auditsQuery);
            return auditsSnapshot.size;
          })
        );
        const auditsCount = auditsCounts.reduce((acc, count) => acc + count, 0);

        const evaluationsCount = evaluations.length;

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
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al obtener los usuarios";
    return res.status(400).json({ error: errorMessage });
  }
};
