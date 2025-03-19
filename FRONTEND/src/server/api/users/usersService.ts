import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

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
    const response = await axios.get(`${API_URL}/api/v1/users/`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.error);
    } else {
      throw "Error al obtener usuarios";
    }
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (uid: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/users/${uid}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.error);
    } else {
      throw "Error al registrar usuario";
    }
  }
};

// Actualizar perfil de usuario
export const updateUserProfile = async (
  uid: string,
  updates: Partial<User>
) => {
  try {
    const response = await axios.put(`${API_URL}/api/v1/users/${uid}`, updates);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.error);
    } else {
      throw "Error al registrar usuario";
    }
  }
};
