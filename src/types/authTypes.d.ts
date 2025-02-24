export interface User {
  uid: string;
  name: string | null; // displayName de Firebase
  email: string | null;
  emailVerified: boolean; // emailVerified de Firebase
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthPayload {
  username?: string; // displayName
  email: string;
  password: string;
}
