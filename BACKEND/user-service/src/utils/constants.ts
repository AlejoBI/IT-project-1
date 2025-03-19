export const FIREBASE_USERS_ERRORS = {
  // Errores generales de Firestore
  "not-found": "El recurso solicitado no fue encontrado en Firestore.",
  "permission-denied": "No tienes permiso para acceder a este recurso.",
  "unavailable": "El servicio Firestore no está disponible en este momento.",
  "deadline-exceeded": "La solicitud ha excedido el tiempo de espera.",
  "invalid-argument": "Uno o más argumentos proporcionados son inválidos.",
  "out-of-range": "El rango de datos solicitado no es válido.",
  "already-exists": "El recurso ya existe en Firestore.",
  "failed-precondition":
    "La operación no puede completarse debido a una condición previa no cumplida.",
  "aborted": "La operación fue abortada.",
  "resource-exhausted": "Se ha agotado un recurso necesario para la operación.",
  "cancelled": "La operación fue cancelada por el cliente.",
  "data-loss": "Se produjo una pérdida de datos durante la operación.",
  "unknown": "Ocurrió un error desconocido.",

  // Errores específicos de usuarios
  "user-not-found": "El usuario no fue encontrado en Firestore.",
  "user-update-failed": "No se pudo actualizar el perfil del usuario.",
  "user-fetch-failed": "No se pudieron obtener los datos del usuario.",
  "users-fetch-failed": "No se pudieron obtener los perfiles de los usuarios.",
};
