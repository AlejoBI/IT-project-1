import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebaseConfig";
import { setAuthReady, setUser } from "../../application/store/auth/authSlice";
import { Middleware } from "@reduxjs/toolkit";

export const authMiddleware: Middleware = (store) => (next) => {
  let authListenerRegistered = false;

  if (!authListenerRegistered) {
    authListenerRegistered = true;
    onAuthStateChanged(auth, async (user) => {
      const currentState = store.getState().auth;
      try {
        if (user && !currentState.user) {
          const tokenResult = await getIdTokenResult(user);
          const role = tokenResult.claims.role;
          store.dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              emailVerified: user.emailVerified,
              role:
                role === "admin" || role === "auditor" || role === "standard_user"
                  ? role
                  : "standard_user",
            })
          );
        } else if (!user && !currentState.user) {
          store.dispatch(setUser(null));
        }
      } finally {
        store.dispatch(setAuthReady());
      }
    });
  }
  return (action) => next(action);
};
