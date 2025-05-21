import { Request, Response } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  getUsersWithEvaluationsAndAudits,
} from "../controller/userController.js";
import * as firestore from "firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  query,
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
  query: jest.fn(),
}));

describe("usersController", () => {
  describe("getUsers", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockReq = {};
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("debe devolver 404 si no hay usuarios", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
      });

      await getUsers(mockReq as Request, mockRes as Response);

      expect(collection).toHaveBeenCalledWith(expect.anything(), "users");
      expect(getDocs).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "No se encontraron usuarios.",
      });
    });

    it("debe devolver usuarios correctamente", async () => {
      const mockDocs = [
        { id: "u1", data: () => ({ name: "User 1" }) },
        { id: "u2", data: () => ({ name: "User 2" }) },
      ];
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: false,
        docs: mockDocs,
      });

      await getUsers(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([
        { userId: "u1", name: "User 1" },
        { userId: "u2", name: "User 2" },
      ]);
    });

    it("debe manejar errores de Firebase", async () => {
      const error = { code: "auth/invalid-user-token" };
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await getUsers(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });
  });
  describe("getUsers", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockReq = {};
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("debe devolver 404 si no hay usuarios", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: true,
      });

      await getUsers(mockReq as Request, mockRes as Response);

      expect(collection).toHaveBeenCalledWith(expect.anything(), "users");
      expect(getDocs).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "No se encontraron usuarios.",
      });
    });

    it("debe devolver usuarios correctamente", async () => {
      const mockDocs = [
        { id: "u1", data: () => ({ name: "User 1" }) },
        { id: "u2", data: () => ({ name: "User 2" }) },
      ];
      (getDocs as jest.Mock).mockResolvedValueOnce({
        empty: false,
        docs: mockDocs,
      });

      await getUsers(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([
        { userId: "u1", name: "User 1" },
        { userId: "u2", name: "User 2" },
      ]);
    });

    it("debe manejar errores de Firebase", async () => {
      const error = { code: "auth/invalid-user-token" };
      (getDocs as jest.Mock).mockRejectedValueOnce(error);

      await getUsers(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });
  });

  describe("getUser", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockReq = {};
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("debe devolver 404 si el usuario no existe", async () => {
      mockReq = { params: { uid: "user1" } };
      (doc as jest.Mock).mockReturnValue("userDocRef");
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });

      await getUser(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Usuario no encontrado.",
      });
    });

    it("debe devolver null si no hay evaluaciones", async () => {
      mockReq = { params: { uid: "user1" } };
      (doc as jest.Mock).mockReturnValue("userDocRef");
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: "user1",
        data: () => ({ name: "User 1" }),
      });

      // Ensure query is a mock function
      const mockQueryObj = {} as unknown as firestore.Query<
        unknown,
        firestore.DocumentData
      >;
      if (typeof (query as jest.Mock).mockReturnValue !== "function") {
        jest.spyOn(firestore, "query").mockReturnValue(mockQueryObj);
      } else {
        (query as jest.Mock).mockReturnValue(mockQueryObj);
      }
      (getDocs as jest.Mock).mockImplementationOnce(async () => ({
        size: 0,
        empty: true,
        docs: [],
      }));

      const result = await getUser(mockReq as Request, mockRes as Response);
      expect(result).toBeUndefined();
    });

    it("debe devolver usuario con counts y promedio", async () => {
      mockReq = { params: { uid: "user1" } };

      (doc as jest.Mock).mockReturnValue("userDocRef");
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        id: "user1",
        data: () => ({ name: "User 1" }),
      });

      (collection as jest.Mock).mockReturnValue("collectionRef");

      // evaluaciones
      (query as jest.Mock).mockReturnValue("evaluationsQuery");
      (getDocs as jest.Mock)
        // primera llamada: evaluaciones
        .mockResolvedValueOnce({
          size: 2,
          docs: [{ id: "eval1" }, { id: "eval2" }],
        })
        // segunda llamada: auditorías para eval1
        .mockResolvedValueOnce({ size: 1 })
        // tercera llamada: auditorías para eval2
        .mockResolvedValueOnce({ size: 2 })
        // cuarta llamada: complianceReports
        .mockResolvedValueOnce({
          empty: false,
          forEach: (
            cb: (doc: { data: () => { totalScore: number } }) => void
          ) => {
            cb({ data: () => ({ totalScore: 80 }) });
          },
        })
        .mockResolvedValueOnce({
          empty: false,
          forEach: (
            cb: (doc: { data: () => { totalScore: number } }) => void
          ) => {
            cb({ data: () => ({ totalScore: 90 }) });
          },
        });

      await getUser(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "user1",
          name: "User 1",
          evaluationsCount: 2,
          auditsCount: 3,
          evaluationsAverage: 85,
        })
      );
    });

    it("debe manejar error Firebase", async () => {
      mockReq = { params: { uid: "user1" } };
      (doc as jest.Mock).mockReturnValue("userDocRef");
      (getDoc as jest.Mock).mockRejectedValueOnce({
        code: "auth/invalid-user-token",
      });

      await getUser(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });
  });

  describe("updateUser", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockReq = {};
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("debe devolver 404 si el usuario no existe", async () => {
      mockReq = { params: { userId: "user1" }, body: { name: "New Name" } };
      (doc as jest.Mock).mockReturnValue("userDocRef");
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });

      await updateUser(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Usuario no encontrado.",
      });
    });

    it("debe actualizar usuario correctamente", async () => {
      mockReq = { params: { userId: "user1" }, body: { name: "New Name" } };
      (doc as jest.Mock).mockReturnValue("userDocRef");
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => true });
      (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await updateUser(mockReq as Request, mockRes as Response);

      expect(updateDoc).toHaveBeenCalledWith(
        "userDocRef",
        expect.objectContaining({
          name: "New Name",
          updatedAt: expect.any(Date),
        })
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Perfil de usuario actualizado exitosamente",
      });
    });

    it("debe manejar error Firebase", async () => {
      mockReq = { params: { userId: "user1" }, body: { name: "New Name" } };
      (doc as jest.Mock).mockReturnValue("userDocRef");
      (getDoc as jest.Mock).mockRejectedValueOnce({
        code: "auth/invalid-user-token",
      });

      await updateUser(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });
  });

  describe("getUsersWithEvaluationsAndAudits", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockReq = {};
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it("debe devolver 404 si no hay usuarios", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({ empty: true });

      await getUsersWithEvaluationsAndAudits(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "No se encontraron usuarios.",
      });
    });

    it("debe devolver usuarios con counts filtrando los que no tienen evaluaciones", async () => {
      const userDocs = [
        {
          id: "user1",
          data: () => ({ name: "User 1" }),
        },
        {
          id: "user2",
          data: () => ({ name: "User 2" }),
        },
      ];

      const evalDoc = {
        id: "eval1",
        data: () => ({ userId: "user1" }),
      };

      // Mock `collection` para diferentes llamadas
      (collection as jest.Mock)
        .mockImplementationOnce(() => "usersCollection")
        .mockImplementationOnce(() => "evaluationsCollectionUser1")
        .mockImplementationOnce(() => "evaluationsCollectionUser2")
        .mockImplementationOnce(() => "auditsCollectionEval1");

      (getDocs as jest.Mock)
        // usuarios
        .mockResolvedValueOnce({ empty: false, docs: userDocs })
        // evaluaciones user1
        .mockResolvedValueOnce({ docs: [evalDoc], size: 1 })
        // evaluaciones user2 (vacío)
        .mockResolvedValueOnce({ docs: [], size: 0 })
        // auditorías para eval1
        .mockResolvedValueOnce({ size: 2 });

      (query as jest.Mock).mockImplementation(() => "queryMock");

      const expectedResponse = [
        {
          userId: "user1",
          name: "User 1",
          evaluationsCount: 1,
          auditsCount: 2,
        },
      ];

      await getUsersWithEvaluationsAndAudits(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("debe manejar errores de Firebase", async () => {
      (getDocs as jest.Mock).mockRejectedValueOnce({
        code: "auth/invalid-user-token",
      });

      await getUsersWithEvaluationsAndAudits(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });
  });
});
