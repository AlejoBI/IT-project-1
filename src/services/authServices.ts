import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { AuthPayload, User } from "../types/authTypes";

export const loginUser = createAsyncThunk<
  User,
  AuthPayload,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      return rejectWithValue("Debes verificar tu correo electrónico.");
    }

    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  } catch (error) {
    const firebaseError = error as { code: string; message: string };
    return rejectWithValue(firebaseError.code);
  }
});

export const registerUser = createAsyncThunk<
  User,
  AuthPayload,
  { rejectValue: string }
>(
  "auth/register",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      await sendEmailVerification(user);

      await signOut(auth);

      return {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      const firebaseError = error as { code: string; message: string };
      return rejectWithValue(firebaseError.code);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});
