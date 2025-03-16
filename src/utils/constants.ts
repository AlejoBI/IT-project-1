// Constantes globales de la aplicación
export const FIREBASE_SERVICE_ERROR_CODES = {
  // Errores generales de Firebase Authentication
  "auth/user-not-found": "El usuario no existe.",
  "auth/wrong-password": "La contraseña es incorrecta.",
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

  // Errores específicos del servicio de autenticación (authService.ts)
  "auth/email-not-verified":
    "Debes verificar tu correo electrónico antes de continuar.",
  "auth/profile-update-failed": "No se pudo actualizar el perfil del usuario.",
  "auth/email-verification-sent":
    "Se ha enviado un correo de verificación. Revisa tu bandeja de entrada.",
  "auth/logout-success": "Sesión cerrada exitosamente.",
  "auth/logout-failed": "No se pudo cerrar la sesión. Intenta nuevamente.",

  // Errores específicos del servicio de compliance (complianceService.ts)
  "compliance/invalid-question-id": "La pregunta no existe o no es válida.",
  "compliance/missing-answer":
    "Debes responder todas las preguntas obligatorias.",
  "compliance/invalid-answer-format":
    "El formato de la respuesta no es válido.",
  "compliance/missing-evidence": "Debes adjuntar evidencia para esta pregunta.",
  "compliance/unsupported-file-type": "El tipo de archivo no está permitido.",
  "compliance/file-too-large": "El archivo excede el tamaño máximo permitido.",
  "compliance/audit-not-found": "La auditoría solicitada no existe.",
  "compliance/audit-already-completed": "La auditoría ya ha sido completada.",
  "compliance/audit-in-progress": "La auditoría ya está en progreso.",
  "compliance/pdca-plan-missing": "Debes definir un plan antes de continuar.",
  "compliance/pdca-do-incomplete":
    "La implementación del plan está incompleta.",
  "compliance/pdca-check-missing":
    "Debes realizar la verificación antes de actuar.",
  "compliance/pdca-act-missing": "Debes registrar acciones correctivas.",
  "compliance/report-generation-failed":
    "No se pudo generar el reporte. Intenta nuevamente.",
  "compliance/unknown-error":
    "Ocurrió un error inesperado. Por favor, intenta más tarde.",

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
  "firestore/unavailable": "El servicio de Firestore no está disponible en este momento.",
  "firestore/internal": "Ocurrió un error interno en Firestore.",
  default: "Ocurrió un error inesperado al interactuar con Firestore.",
};

// Modo Claro
export const LIGHT_MODE_COLORS = {
  BACKGROUND: "bg-gray-50", // Fondo principal
  TEXT_PRIMARY: "text-gray-800", // Texto principal
  TEXT_SECONDARY: "text-gray-600", // Texto secundario
  ACCENT: "text-indigo-600", // Acento primario
  BUTTON_BG: "bg-indigo-500", // Fondo de botones
  BUTTON_HOVER_BG: "hover:bg-indigo-600", // Hover de botones
  SIDEBAR_BG: "bg-gray-100", // Fondo del Sidebar
  HOVER_BG: "hover:bg-indigo-100", // Hover general
};

// Modo Oscuro
export const DARK_MODE_COLORS = {
  BACKGROUND: "dark:bg-gray-900", // Fondo principal
  TEXT_PRIMARY: "dark:text-gray-200", // Texto principal
  TEXT_SECONDARY: "dark:text-gray-400", // Texto secundario
  ACCENT: "dark:text-indigo-400", // Acento primario
  BUTTON_BG: "dark:bg-indigo-600", // Fondo de botones
  BUTTON_HOVER_BG: "dark:hover:bg-indigo-700", // Hover de botones
  SIDEBAR_BG: "dark:bg-gray-800", // Fondo del Sidebar
  HOVER_BG: "dark:hover:bg-indigo-900", // Hover general
};

// Tiempos de Animación
export const ANIMATION_TIMINGS = {
  TRANSITION_DURATION: "duration-500", // Duración estándar de transiciones
};