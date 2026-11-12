import { FIREBASE_ERRORS } from "./constants.js";

export const getFirebaseErrorMessage = (error: unknown, fallback: string): string => {
  const code =
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
      ? (error.code as keyof typeof FIREBASE_ERRORS)
      : undefined;

  return (code ? FIREBASE_ERRORS[code] : undefined) || fallback;
};
