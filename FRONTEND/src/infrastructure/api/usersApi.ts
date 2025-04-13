import api from "./axios";

interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Obtener perfiles de usuarios
export const getUserProfiles = async () => {
  try {
    const response = await api.get("/api/users/");
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (uid: string) => {
  try {
    const response = await api.get(`/api/users/${uid}`);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

// Actualizar perfil de usuario
export const updateUserProfile = async (
  uid: string,
  updates: Partial<User>
) => {
  try {
    const response = await api.put(`/api/users/${uid}`, updates);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};
