export interface User {
  uid: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: boolean;
  role: string;
  evaluationsCount?: number;
  auditsCount?: number;
  evaluationsAverage?: number;
}

export interface UserPayload {
  uid: string;
  name: string | null;
  username: string;
  email: string;
  role: "admin" | "standard_user" | "auditor";
  emailVerified: boolean;
}

export interface UserUpdatePayload {
  email?: string | null;
  role?: "admin" | "standard_user" | "auditor";
}