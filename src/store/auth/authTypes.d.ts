export interface User {
  uid: string;
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthPayload {
  email: string;
  password: string;
}
