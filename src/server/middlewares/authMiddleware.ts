import { Middleware } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { setUser as setAuthUser } from "../controller/authSlice";
import { fetchUserAction } from "../services/user/userActions";

export const authMiddleware: Middleware = (store) => (next) => {
  // Observar cambios en la autenticación
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // Establecer datos básicos del usuario en el estado `auth`
      store.dispatch(
        setAuthUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || null,
          name: firebaseUser.displayName || null,
          emailVerified: firebaseUser.emailVerified,
        })
      );

      // Obtener datos extendidos del usuario desde Firestore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await store.dispatch(fetchUserAction(firebaseUser.uid) as any);
    } else {
      // Limpiar el estado si no hay usuario autenticado
      store.dispatch(setAuthUser(null));
    }
  });

  // Pasar la acción al siguiente middleware
  return (action) => next(action);
};
