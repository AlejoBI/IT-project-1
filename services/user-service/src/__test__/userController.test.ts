import { Request } from "express";
import { getUsers, getUser, updateUser } from "../controller/userController.js";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// Mock de firestore desde utils
jest.mock("../utils/firebaseConfig", () => ({
  firestore: {},
}));

// Mock de métodos de firebase/firestore
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

describe("usersController", () => {
  const mockReq = {} as Request;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("debería retornar usuarios correctamente", async () => {
      const mockDocs = [
        { id: "user1", data: () => ({ name: "User 1" }) },
        { id: "user2", data: () => ({ name: "User 2" }) },
      ];

      (getDocs as jest.Mock).mockResolvedValue({
        empty: false,
        docs: mockDocs,
      });

      await getUsers(mockReq, mockRes);

      expect(collection).toHaveBeenCalled();
      expect(getDocs).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([
        { uid: "user1", name: "User 1" },
        { uid: "user2", name: "User 2" },
      ]);
    });

    it("debería manejar error si no hay usuarios", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ empty: true });

      await getUsers(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al iniciar sesión",
      });
    });
  });

  describe("getUser", () => {
    it("debería retornar un usuario correctamente", async () => {
      const mockUser = {
        exists: () => true,
        id: "user1",
        data: () => ({
          email: "test@mail.com",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      };

      (getDoc as jest.Mock).mockResolvedValue(mockUser);

      const req = { params: { uid: "user1" } } as any;

      await getUser(req, mockRes);

      expect(doc).toHaveBeenCalled();
      expect(getDoc).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        uid: "user1",
        email: "test@mail.com",
        role: "user",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it("debería manejar error si no existe", async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

      const req = { params: { uid: "user1" } } as any;

      await getUser(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al iniciar sesión",
      });
    });
  });

  describe("updateUser", () => {
    it("debería actualizar un usuario correctamente", async () => {
      (updateDoc as jest.Mock).mockResolvedValue(undefined);
      const mockDocRef = { id: "mockedDocRef" };
      (doc as jest.Mock).mockReturnValue(mockDocRef);

      const req = {
        params: { uid: "user1" },
        body: { name: "Nuevo Nombre" },
      } as any;

      await updateUser(req, mockRes);

      expect(doc).toHaveBeenCalledWith(expect.anything(), "users", "user1");
      expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
        name: "Nuevo Nombre",
        updatedAt: expect.any(Date),
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Perfil de usuario actualizado exitosamente",
      });
    });

    it("debería manejar error si falla", async () => {
      (updateDoc as jest.Mock).mockRejectedValue(new Error("error"));
      const mockDocRef = { id: "mockedDocRef" };
      (doc as jest.Mock).mockReturnValue(mockDocRef);

      const req = {
        params: { uid: "user1" },
        body: { name: "Nuevo Nombre" },
      } as any;

      await updateUser(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al iniciar sesión",
      });
    });
  });
});
