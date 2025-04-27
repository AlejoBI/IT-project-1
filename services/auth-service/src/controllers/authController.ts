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

export const register = async (req: Request, res: Response) => {
  const { email, password, username, name } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user);

    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name: name,
      email: user.email,
      role: "standard_user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();

    res.status(201).json({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      role: userData.role,
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al crear la cuenta";
    res.status(400).json({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
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
      return res.status(404).json({ error: "User not found" });
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
    res.status(200).json({ message: "Logged out successfully" });
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
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] ||
      "Error al enviar el correo de recuperación";
    res.status(400).json({ error: errorMessage });
  }
};
