import {
  loginUser,
  registerUser,
  logoutUser,
} from "../server/services/auth/authActions";
import {
  loginService,
  registerService,
  logoutService,
} from "../server/services/auth/authService";
import { createUserAction } from "../server/services/user/userActions";

// Mockear los servicios y acciones de Redux
jest.mock("../server/services/auth/authService", () => ({
  loginService: jest.fn(),
  registerService: jest.fn(),
  logoutService: jest.fn(),
}));

jest.mock("../server/services/user/userActions", () => ({
  createUserAction: jest.fn(),
}));

describe("Auth Actions", () => {
  const mockPayload = {
    email: "test@example.com",
    password: "password123",
    username: "Test User",
  };

  const mockAuthUser = {
    uid: "mock-uid",
    name: "Test User",
    email: "test@example.com",
    emailVerified: true,
  };

  const mockUserData = {
    uid: "mock-uid",
    name: "Test User",
    email: "test@example.com",
    emailVerified: true,
    role: "standard_user",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    it("should log in a user successfully", async () => {
      (loginService as jest.Mock).mockResolvedValue(mockAuthUser);

      const dispatch = jest.fn();
      const thunk = loginUser(mockPayload);

      await thunk(dispatch, () => ({}), undefined);

      expect(loginService).toHaveBeenCalledWith(mockPayload);
      expect(dispatch).toHaveBeenCalledWith({
        type: "auth/login/fulfilled",
        payload: mockAuthUser,
        meta: expect.any(Object),
      });
    });

    it("should handle login errors", async () => {
      const mockError = new Error("Invalid credentials");
      (loginService as jest.Mock).mockRejectedValue(mockError);

      const dispatch = jest.fn();
      const thunk = loginUser(mockPayload);

      await thunk(dispatch, () => ({}), undefined);

      expect(loginService).toHaveBeenCalledWith(mockPayload);
      expect(dispatch).toHaveBeenCalledWith({
        type: "auth/login/rejected",
        payload: "Invalid credentials",
        meta: expect.any(Object),
        error: expect.any(Object),
      });
    });
  });

  describe("registerUser", () => {
    it("should register a user and create their data in Firestore", async () => {
      // Mockear el servicio de registro
      (registerService as jest.Mock).mockResolvedValue(mockAuthUser);

      // Mockear createUserAction para devolver un payload consistente
      (createUserAction as unknown as jest.Mock).mockResolvedValue({
        type: "user/create/fulfilled",
        payload: {
          ...mockUserData,
          createdAt: new Date(), // Fecha dinámica
          updatedAt: new Date(), // Fecha dinámica
        },
      });

      const dispatch = jest.fn();
      const thunk = registerUser(mockPayload);

      await thunk(dispatch, () => ({}), undefined);

      // Verificar que se llamó al servicio de registro
      expect(registerService).toHaveBeenCalledWith(mockPayload);

      // Verificar que se llamó a createUserAction con los datos correctos
      expect(createUserAction).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: mockUserData.uid,
          name: mockUserData.name,
          email: mockUserData.email,
          emailVerified: mockUserData.emailVerified,
          role: mockUserData.role,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );

      // Verificar las llamadas a dispatch
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/register/pending",
        meta: expect.any(Object),
        payload: undefined,
      });

      /* expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "auth/register/fulfilled",
        meta: expect.any(Object),
        payload: expect.objectContaining({
          uid: mockUserData.uid,
          name: mockUserData.name,
          email: mockUserData.email,
          emailVerified: mockUserData.emailVerified,
          role: mockUserData.role,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      }); */
    });

    it("should handle registration errors", async () => {
      const mockError = new Error("Email already in use");
      (registerService as jest.Mock).mockRejectedValue(mockError);

      const dispatch = jest.fn();
      const thunk = registerUser(mockPayload);

      await thunk(dispatch, () => ({}), undefined);

      expect(registerService).toHaveBeenCalledWith(mockPayload);
      expect(dispatch).toHaveBeenCalledWith({
        type: "auth/register/rejected",
        payload: "Email already in use",
        meta: expect.any(Object),
        error: expect.any(Object),
      });
    });
  });

  describe("logoutUser", () => {
    it("should log out a user successfully", async () => {
      (logoutService as jest.Mock).mockResolvedValue(undefined);

      const dispatch = jest.fn();
      const thunk = logoutUser();

      await thunk(dispatch, () => ({}), undefined);

      expect(logoutService).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "auth/logout/pending",
        meta: expect.any(Object),
        payload: undefined,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "auth/logout/fulfilled",
        meta: expect.any(Object),
        payload: undefined,
      });
    });

    it("should handle logout errors", async () => {
      const mockError = new Error("Logout failed");
      (logoutService as jest.Mock).mockRejectedValue(mockError);

      const dispatch = jest.fn();
      const thunk = logoutUser();

      await thunk(dispatch, () => ({}), undefined);

      expect(logoutService).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith({
        type: "auth/logout/rejected",
        payload: "Logout failed",
        meta: expect.any(Object),
        error: expect.any(Object),
      });
    });
  });
});
