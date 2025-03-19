import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

export const registerService = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/register`,
      userData
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.error);
    } else {
      throw "Error al registrar usuario";
    }
  }
};

export const loginService = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      credentials
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.error);
    } else {
      throw "Error al iniciar sesión";
    }
  }
};

export const logoutService = async () => {
  try {
    await axios.post(`${API_URL}/api/v1/auth/logout`);
    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.error);
    } else {
      throw "Error al cerrar sesión";
    }
  }
};
