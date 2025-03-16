import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserInFirestore,
  getUserFromFirestore,
  updateUserInFirestore,
} from "./userService";
import { User } from "../../models/userTypes";

// Crear un nuevo usuario en Firestore
export const createUserAction = createAsyncThunk(
  "user/create",
  async (userData: User, { rejectWithValue }) => {
    try {
      await createUserInFirestore(userData);
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Obtener datos de un usuario desde Firestore
export const fetchUserAction = createAsyncThunk(
  "user/fetch",
  async (uid: string, { rejectWithValue }) => {
    try {
      const user = await getUserFromFirestore(uid);
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Actualizar datos de un usuario en Firestore
export const updateUserAction = createAsyncThunk(
  "user/update",
  async (
    { uid, updates }: { uid: string; updates: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      await updateUserInFirestore(uid, updates);
      return { uid, updates };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
