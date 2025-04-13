import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebaseConfig";
import { setUser } from "../../application/store/auth/authSlice";
import { Middleware } from "@reduxjs/toolkit";

export const authMiddleware: Middleware = (store) => (next) => {
  onAuthStateChanged(auth, async (user) => {
    const currentState = store.getState().auth;
    if (user) {
      store.dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          emailVerified: user.emailVerified,
        })
      );
    } else {
      if (!currentState.user) {
        store.dispatch(setUser(null));
      }
    }
  });
  return (action) => next(action);
};
