import { Middleware } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { setUser } from "../store/slices/authSlice";

export const authMiddleware: Middleware = (store) => (next) => {
  // usa store para acceder al estado global de la app y next para pasar la acción al siguiente middleware
  // Esto se debe a que el middleware tiene acceso directo al store y su dispatch, y no necesita depender de hooks de React.
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      store.dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || null,
          name: firebaseUser.displayName || null,
          emailVerified: firebaseUser.emailVerified,
        })
      );
    } else {
      store.dispatch(setUser(null));
    }
  });

  return (action) => next(action);
};
