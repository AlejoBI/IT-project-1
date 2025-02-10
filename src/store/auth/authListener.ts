import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { setUser } from "./authSlice";
import { AppDispatch } from "../store";

export const authListener = (dispatch: AppDispatch) => {
  console.log("authListener");
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        })
      );
    } else {
      dispatch(setUser(null));
    }
  });
};
