import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { AuthPayload } from "../../models/authTypes";
import { User } from "../../models/userTypes";
import { getUserFromFirestore } from "../user/userService";

export const loginService = async ({
  email,
  password,
}: AuthPayload): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      throw new Error("Debes verificar tu correo electrónico.");
    }

    const userData = await getUserFromFirestore(user.uid);

    if (!userData) {
      throw new Error("No se encontraron datos del usuario en Firestore.");
    }

    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      role: userData.role || "standard_user", 
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  } catch (error) {
    const firebaseError = error as { code: string; message: string };
    throw new Error(firebaseError.message);
  }
};

export const registerService = async ({
  email,
  password,
  username,
}: AuthPayload) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user);

    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  } catch (error) {
    const firebaseError = error as { code: string; message: string };
    throw new Error(firebaseError.code);
  }
};

export const logoutService = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const firebaseError = error as { code: string; message: string };
    throw new Error(firebaseError.code);
  }
};
