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

import { getFirebaseErrorMessage } from "../utils/error.js";
import { getAdminAuth } from "../utils/firebaseAdmin.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username, name } = req.body;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
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

    if (process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      await getAdminAuth().setCustomUserClaims(user.uid, { role: "standard_user" });
    }

    res.status(201).json({
      message: "Registro exitoso. Por favor verifica tu correo electrónico.",
    });
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al crear la cuenta");
    res.status(400).json({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    if (!user.emailVerified) {
      res.status(403).json({ error: "Por favor verifica tu correo electrónico" });
      return;
    }

    const userData = userDoc.data();

    // Firestore stores the operational role, while protected Express services
    // authorize from verified token claims. Keep both sources synchronized before
    // the frontend obtains its Firebase ID token.
    if (
      (userData.role === "admin" ||
        userData.role === "auditor" ||
        userData.role === "standard_user") &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ) {
      const adminUser = await getAdminAuth().getUser(user.uid);
      await getAdminAuth().setCustomUserClaims(user.uid, {
        ...(adminUser.customClaims || {}),
        role: userData.role,
      });
    }

    res.status(200).json({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      role: userData.role,
    });
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al iniciar sesión");
    res.status(400).json({ error: errorMessage });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await signOut(auth);
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(error, "Error al cerrar sesión");
    res.status(400).json({ error: errorMessage });
  }
};

export const recoverPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    const errorMessage = getFirebaseErrorMessage(
      error,
      "Error al enviar el correo de recuperación"
    );
    res.status(400).json({ error: errorMessage });
  }
};
