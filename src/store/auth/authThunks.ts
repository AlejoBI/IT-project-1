import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { AuthPayload, User } from "./authTypes";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../../config/firebaseConfig";

export const loginUser = createAsyncThunk<User, AuthPayload>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return { uid: user.uid, name: user.displayName, email: user.email };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const registerUser = createAsyncThunk<User, AuthPayload>(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await setDoc(doc(firestore, "users", user.uid), {
        name: "User",
        email: user.email,
        state: "active",
        createdAt: Timestamp.now(),
      });
      return { uid: user.uid, name: user.displayName, email: user.email };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});
