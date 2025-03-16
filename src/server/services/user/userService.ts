import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebaseConfig";
import { User } from "../../models/userTypes";

// Crear un nuevo usuario en Firestore
export const createUserInFirestore = async (userData: User) => {
  try {
    const userRef = doc(firestore, "users", userData.uid);
    await setDoc(userRef, {
      uid: userData.uid,
      name: userData.name || null,
      email: userData.email || null,
      emailVerified: userData.emailVerified,
      role: userData.role || "standard_user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    const firebaseError = error as { code: string; message: string };
    throw new Error(firebaseError.message);
  }
};

// Obtener datos de un usuario desde Firestore
export const getUserFromFirestore = async (
  uid: string
): Promise<User | null> => {
  try {
    const userRef = doc(firestore, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      return {
        uid: userSnapshot.id,
        ...userSnapshot.data(),
      } as User;
    }
    return null;
  } catch (error) {
    const firebaseError = error as { code: string; message: string };
    throw new Error(firebaseError.message);
  }
};

// Actualizar datos de un usuario en Firestore
export const updateUserInFirestore = async (
  uid: string,
  updates: Partial<User>
) => {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    const firebaseError = error as { code: string; message: string };
    throw new Error(firebaseError.message);
  }
};
