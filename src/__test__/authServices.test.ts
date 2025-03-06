import {
  loginUser,
  registerUser,
  logoutUser,
} from "../server/services/authServices"; // Importa las funciones de autenticación
import { auth } from "../server/config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

jest.mock("firebase/auth"); // Mockea el módulo de autenticación de Firebase para las pruebas
jest.mock("../server/config/firebaseConfig", () => ({
  firebaseConfig: {
    apiKey: "test-api-key",
    authDomain: "test-auth-domain",
    projectId: "test-project-id",
    storageBucket: "test-storage-bucket",
    messagingSenderId: "test-messaging-sender-id",
    appId: "test-app-id",
  },
})); // Mockea el módulo de configuración de Firebase para las pruebas

const createThunkArgs = () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const extra = undefined;
  const requestId = "";
  const signal = new AbortController().signal;
  const rejectWithValue = jest.fn();

  return { dispatch, getState, extra, requestId, signal, rejectWithValue };
};

describe("Auth Services", () => {
  // Describe el grupo de pruebas para los servicios de autenticación
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks antes de cada prueba
  });

  test("loginUser should login a user with valid credentials", async () => {
    // Prueba que loginUser debe iniciar sesión con credenciales válidas
    const mockUser = {
      // Define un usuario mock
      uid: "123",
      displayName: "Test User",
      email: "test@example.com",
      emailVerified: true,
    };

    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      // Mockea la función signInWithEmailAndPassword para que resuelva con el usuario mock
      user: mockUser,
    });

    const thunk = loginUser({
      // Crea el thunk para loginUser con las credenciales de prueba
      email: "test@example.com",
      password: "password",
    });

    const { dispatch, getState, extra, requestId, signal, rejectWithValue } =
      createThunkArgs();

    const result = await thunk(dispatch, getState, {
      // Ejecuta el thunk con los mocks y parámetros definidos
      extra,
      requestId,
      signal,
      rejectWithValue,
    });

    expect(result.payload).toEqual({
      // Verifica que el resultado tenga el payload esperado
      uid: "123",
      name: "Test User",
      email: "test@example.com",
      emailVerified: true,
    });
  });

  test("registerUser should register a new user and send email verification", async () => {
    // Prueba que registerUser debe registrar un nuevo usuario y enviar verificación de email
    const mockUser = {
      // Define un usuario mock
      uid: "123",
      displayName: "Test User",
      email: "test@example.com",
      emailVerified: false,
    };

    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      // Mockea la función createUserWithEmailAndPassword para que resuelva con el usuario mock
      user: mockUser,
    });

    const thunk = registerUser({
      // Crea el thunk para registerUser con los datos de prueba
      email: "test@example.com",
      password: "password",
      username: "Test User",
    });

    const { dispatch, getState, extra, requestId, signal, rejectWithValue } =
      createThunkArgs();

    const result = await thunk(dispatch, getState, {
      // Ejecuta el thunk con los mocks y parámetros definidos
      extra,
      requestId,
      signal,
      rejectWithValue,
    });

    expect(updateProfile).toHaveBeenCalledWith(mockUser, {
      // Verifica que updateProfile haya sido llamado con el usuario mock y el displayName
      displayName: "Test User",
    });
    expect(sendEmailVerification).toHaveBeenCalledWith(mockUser); // Verifica que sendEmailVerification haya sido llamado con el usuario mock
    expect(signOut).toHaveBeenCalledWith(auth); // Verifica que signOut haya sido llamado con auth
    expect(result.payload).toEqual({
      // Verifica que el resultado tenga el payload esperado
      uid: "123",
      name: "Test User",
      email: "test@example.com",
      emailVerified: false,
    });
  });

  test("logoutUser should sign out the user", async () => {
    // Prueba que logoutUser debe cerrar sesión del usuario
    const thunk = logoutUser(); // Crea el thunk para logoutUser

    const { dispatch, getState, extra, requestId, signal, rejectWithValue } =
      createThunkArgs();

    await thunk(dispatch, getState, {
      // Ejecuta el thunk con los mocks y parámetros definidos
      extra,
      requestId,
      signal,
      rejectWithValue,
    });

    expect(signOut).toHaveBeenCalledWith(auth); // Verifica que signOut haya sido llamado con auth
  });
});
