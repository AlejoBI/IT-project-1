export interface User {
  uid: string; // ID único del usuario en Firebase
  name: string | null; // Nombre de usuario (displayName)
  email: string | null; // Correo electrónico del usuario
  emailVerified: boolean; // Indica si el correo electrónico ha sido verificado
  role: string; // Rol del usuario (admin, auditor, standard_user)
  createdAt: Date; // Fecha de creación del usuario
  updatedAt: Date; // Fecha de última actualización
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}