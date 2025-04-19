import { Request } from "express";
import { register, login, logout } from "../controllers/authController.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Mock de config
jest.mock("../utils/firebaseConfig", () => ({
  auth: {},
  firestore: {},
}));

// Mock de métodos de firebase/auth y firestore
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
  sendEmailVerification: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe("authController", () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("debería registrar usuario correctamente", async () => {
      const mockUser = {
        uid: "123",
        email: "test@example.com",
        displayName: "TestUser",
        emailVerified: false,
      };

      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });
      (updateProfile as jest.Mock).mockResolvedValue(undefined);
      (sendEmailVerification as jest.Mock).mockResolvedValue(undefined);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
          username: "TestUser",
        },
      } as any;

      await register(req, mockRes);

      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(updateProfile).toHaveBeenCalledWith(mockUser, {
        displayName: "TestUser",
      });
      expect(sendEmailVerification).toHaveBeenCalledWith(mockUser);
      expect(doc).toHaveBeenCalled();
      expect(setDoc).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        uid: "123",
        name: "TestUser",
        email: "test@example.com",
        emailVerified: false,
      });
    });

    it("debería manejar error en registro", async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
          username: "TestUser",
        },
      } as any;

      await register(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al iniciar sesión",
      });
    });
  });

  describe("login", () => {
    it("debería loguear usuario correctamente", async () => {
      const mockUser = {
        uid: "123",
        displayName: "TestUser",
        email: "test@example.com",
        emailVerified: true,
      };

      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: mockUser,
      });

      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      } as any;

      await login(req, mockRes);

      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        uid: "123",
        name: "TestUser",
        email: "test@example.com",
        emailVerified: true,
      });
    });

    it("debería manejar error en login", async () => {
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      } as any;

      await login(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al iniciar sesión",
      });
    });
  });

  describe("logout", () => {
    it("debería cerrar sesión correctamente", async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await logout({} as Request, mockRes);

      expect(signOut).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Logged out successfully",
      });
    });

    it("debería manejar error en logout", async () => {
      (signOut as jest.Mock).mockRejectedValue(new Error("Error"));

      await logout({} as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al iniciar sesión",
      });
    });
  });
});
