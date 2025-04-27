export interface AuthUser {
  uid: string;
  name: string | null;
  username: string | null;
  role: string | null;
  email: string | null;
  emailVerified: boolean;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
