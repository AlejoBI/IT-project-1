export const FIREBASE_ERRORS = {
  "auth/user-not-found": "El usuario no existe.",
  "auth/wrong-password": "La contraseña es incorrecta.",
  "auth/email-already-exists": "El correo electrónico ya existe.",
  "auth/email-already-in-use": "El correo electrónico ya está en uso.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/network-request-failed":
    "Error de conexión. Verifica tu red e intenta nuevamente.",
  "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",
  "auth/user-disabled": "Este usuario ha sido deshabilitado.",
  "auth/operation-not-allowed":
    "La autenticación por correo y contraseña no está habilitada.",
  "auth/requires-recent-login":
    "Debes iniciar sesión nuevamente para realizar esta acción.",
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/email-not-verified":
    "Debes verificar tu correo electrónico antes de continuar.",
  "auth/profile-update-failed": "No se pudo actualizar el perfil del usuario.",
  "auth/email-verification-sent":
    "Se ha enviado un correo de verificación. Revisa tu bandeja de entrada.",
  "auth/logout-success": "Sesión cerrada exitosamente.",
  "auth/logout-failed": "No se pudo cerrar la sesión. Intenta nuevamente.",

  // Errores generales de Firestore
  "firestore/permission-denied":
    "No tienes permisos para realizar esta acción.",
  "firestore/document-not-found": "El documento solicitado no existe.",
  "firestore/invalid-data": "Los datos proporcionados no son válidos.",
  "firestore/write-failed":
    "No se pudo guardar la información. Intenta nuevamente.",
  "firestore/read-failed":
    "No se pudo leer la información. Intenta nuevamente.",

  // Errores específicos de Firestore (firestoreService.ts)
  "firestore/not-found": "El recurso solicitado no existe.",
  "firestore/invalid-argument": "Los datos proporcionados son inválidos.",
  "firestore/unavailable":
    "El servicio de Firestore no está disponible en este momento.",
  "firestore/internal": "Ocurrió un error interno en Firestore.",
  default: "Ocurrió un error inesperado al interactuar con Firestore.",
};
