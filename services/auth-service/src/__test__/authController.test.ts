import { register, login, logout } from "../controllers/authController";
import { Request } from "express";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, getDoc } from "firebase/firestore";

jest.mock("firebase/auth");
jest.mock("firebase/firestore");

const mockReq = {} as Request;
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("authController", () => {
  describe("register", () => {
    it("debería registrar usuario correctamente", async () => {
      const mockUser = { uid: "123", email: "test@example.com" };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });
      (signOut as jest.Mock).mockResolvedValue(undefined);
      (updateProfile as jest.Mock).mockResolvedValue(undefined);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      mockReq.body = {
        email: "test@example.com",
        password: "password",
        username: "TestUser",
        name: "Test Name",
      };

      await register(mockReq, mockRes);

      expect(setDoc).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Registro exitoso. Por favor verifica tu correo electrónico.",
      });
    });

    it("debería manejar error en registro", async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
        code: "auth/email-already-in-use",
      });

      mockReq.body = {
        email: "test@example.com",
        password: "password",
        username: "TestUser",
        name: "Test Name",
      };

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "El correo electrónico ya está en uso.",
      });
    });
  });

  describe("login", () => {
    it("debería loguear usuario correctamente", async () => {
      const mockUser = {
        uid: "123",
        email: "test@example.com",
        emailVerified: true,
        displayName: "TestUser",
      };

      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        data: () => ({ role: "standard_user" }),
      });

      mockReq.body = {
        email: "test@example.com",
        password: "password",
      };

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        uid: "123",
        name: "TestUser",
        email: "test@example.com",
        emailVerified: true,
        role: "standard_user",
      });
    });
  });

  describe("logout", () => {
    it("debería cerrar sesión correctamente", async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await logout(mockReq, mockRes);

      expect(signOut).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Sesión cerrada exitosamente",
      });
    });

    it("debería manejar error en logout", async () => {
      (signOut as jest.Mock).mockRejectedValue({ code: "auth/internal-error" });

      await logout(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al cerrar sesión",
      });
    });
  });
});
