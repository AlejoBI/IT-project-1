import { Request } from "express";
import {
  addRegulation,
  getRegulations,
  getRegulation,
  updateRegulation,
  deleteRegulation,
} from "../controllers/regulationController.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Mock de firestore desde utils
jest.mock("../utils/firebaseConfig", () => ({
  firestore: {},
}));

// Mock de métodos de firebase/firestore
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe("regulationController", () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRegulations", () => {
    it("debería retornar normativas correctamente", async () => {
      const mockDocs = [
        { id: "reg1", data: () => ({ name: "Normativa 1" }) },
        { id: "reg2", data: () => ({ name: "Normativa 2" }) },
      ];

      (getDocs as jest.Mock).mockResolvedValue({
        empty: false,
        docs: mockDocs,
      });

      await getRegulations({} as Request, mockRes);

      expect(collection).toHaveBeenCalled();
      expect(getDocs).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([
        { id: "reg1", name: "Normativa 1" },
        { id: "reg2", name: "Normativa 2" },
      ]);
    });

    it("debería manejar error si no hay normativas", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ empty: true });

      await getRegulations({} as Request, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al obtener las normativas",
      });
    });
  });

  describe("getRegulation", () => {
    it("debería retornar una normativa correctamente", async () => {
      const mockReg = {
        exists: () => true,
        id: "reg1",
        data: () => ({ name: "Normativa 1" }),
      };

      (getDoc as jest.Mock).mockResolvedValue(mockReg);

      const req = { params: { id: "reg1" } } as any;

      await getRegulation(req, mockRes);

      expect(doc).toHaveBeenCalled();
      expect(getDoc).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        id: "reg1",
        name: "Normativa 1",
      });
    });

    it("debería manejar error si no existe", async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

      const req = { params: { id: "reg1" } } as any;

      await getRegulation(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Normativa no encontrada.",
      });
    });
  });

  describe("addRegulation", () => {
    it("debería agregar normativa correctamente", async () => {
      (addDoc as jest.Mock).mockResolvedValue(undefined);

      const req = {
        body: { name: "Nueva Normativa", description: "Desc", version: "1.0" },
      } as any;

      await addRegulation(req, mockRes);

      expect(collection).toHaveBeenCalled();
      expect(addDoc).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Normativa agregada exitosamente.",
      });
    });

    it("debería manejar error si falla", async () => {
      (addDoc as jest.Mock).mockRejectedValue(new Error("Error"));

      const req = {
        body: { name: "Nueva Normativa", description: "Desc", version: "1.0" },
      } as any;

      await addRegulation(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Error al agregar la normativa",
      });
    });
  });

  describe("updateRegulation", () => {
    it("debería actualizar normativa correctamente", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
      });
      (updateDoc as jest.Mock).mockResolvedValue(undefined);
      const mockDocRef = { id: "mockedRegRef" };
      (doc as jest.Mock).mockReturnValue(mockDocRef);

      const req = {
        params: { id: "reg1" },
        body: { name: "Actualizado", description: "Desc", version: "2.0" },
      } as any;

      await updateRegulation(req, mockRes);

      expect(updateDoc).toHaveBeenCalledWith(mockDocRef, {
        name: "Actualizado",
        description: "Desc",
        version: "2.0",
        updatedAt: expect.any(Date),
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Normativa actualizada exitosamente.",
      });
    });

    it("debería manejar error si no existe", async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

      const req = {
        params: { id: "reg1" },
        body: { name: "Actualizado", description: "Desc", version: "2.0" },
      } as any;

      await updateRegulation(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Normativa no encontrada.",
      });
    });
  });

  describe("deleteRegulation", () => {
    it("debería eliminar normativa correctamente", async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
      });
      (deleteDoc as jest.Mock).mockResolvedValue(undefined);

      const req = { params: { id: "reg1" } } as any;

      await deleteRegulation(req, mockRes);

      expect(deleteDoc).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Normativa eliminada exitosamente.",
      });
    });

    it("debería manejar error si no existe", async () => {
      (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

      const req = { params: { id: "reg1" } } as any;

      await deleteRegulation(req, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Normativa no encontrada.",
      });
    });
  });
});
