import { Request, Response } from "express";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../utils/firebaseConfig.js";

import { FIREBASE_ERRORS } from "../utils/constants.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username, name } = req.body;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await signOut(auth);

    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user);

    await setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      name,
      email: user.email,
      role: "standard_user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Registro exitoso. Por favor verifica tu correo electrónico.",
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al crear la cuenta";
    res.status(400).json({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!user.emailVerified) {
      return res
        .status(403)
        .json({ error: "Por favor verifica tu correo electrónico" });
    }

    const userData = userDoc.data();

    res.status(200).json({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      role: userData.role,
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al iniciar sesión";
    res.status(400).json({ error: errorMessage });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await signOut(auth);
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al cerrar sesión";
    res.status(400).json({ error: errorMessage });
  }
};

export const recoverPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] ||
      "Error al enviar el correo de recuperación";
    res.status(400).json({ error: errorMessage });
  }
};
