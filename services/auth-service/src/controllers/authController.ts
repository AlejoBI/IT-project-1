import { Request, Response } from "express";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    const firebaseError = (error as any).code as keyof typeof FIREBASE_ERRORS;
    const errorMessage =
      FIREBASE_ERRORS[firebaseError] || "Error al iniciar sesión";
    res.status(400).json({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await signInWithEmailAndPassword(auth, email, password);

    res.status(200).json({
      message: "User logged in successfully",
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
      FIREBASE_ERRORS[firebaseError] || "Error al iniciar sesión";
    res.status(400).json({ error: errorMessage });
  }
};
