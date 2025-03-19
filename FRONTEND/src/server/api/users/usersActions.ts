import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserProfiles,
  getUserProfile,
  updateUserProfile,
} from "./usersService";

interface User {
  uid: string;
  email: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Obtener datos de todos los usuarios desde Firestore
export const fetchUsersAction = createAsyncThunk(
  "users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUserProfiles();
      return users;
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
      const user = await getUserProfile(uid);
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
      await updateUserProfile(uid, updates);
      return { uid, updates };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
