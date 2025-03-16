export interface AuthPayload {
  username?: string; // Nombre de usuario (opcional, usado en registro)
  email: string; // Correo electrónico
  password: string; // Contraseña
  confirmPassword?: string; // Confirmación de contraseña (opcional, usado en registro)
}

export interface AuthState {
  user: User | null; // Información del usuario actual
  isAuthenticated: boolean; // Indica si el usuario está autenticado
  loading: boolean; // Indica si hay una operación en curso
  error: string | null; // Mensaje de error, si existe
}
