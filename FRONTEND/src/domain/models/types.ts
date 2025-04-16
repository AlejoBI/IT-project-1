// Auth types
export interface AuthUser {
  uid: string;
  name: string | null;
  email: string | null;
  emailVerified: boolean;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// User types
export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPayload {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  emailVerified: boolean;
}

export interface UserUpdatePayload {
  email?: string | null;
  role?: string;
}