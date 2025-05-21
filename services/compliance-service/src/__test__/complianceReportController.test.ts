import { getComplianceReportsController } from "../controllers/complianceReportController";
import { Request, Response } from "express";
import { collection, query, where, getDocs } from "firebase/firestore";

// Mock completo para firebase/firestore
jest.mock("firebase/firestore", () => {
  const original = jest.requireActual("firebase/firestore");
  return {
    ...original,
    collection: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
  };
});

const mockReq = {
  params: { userId: "user123" },
} as unknown as Request;

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("getComplianceReportsController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe retornar los reports correctamente si existen", async () => {
    const mockDocs = [
      {
        id: "report1",
        data: () => ({
          userId: "user123",
          totalScore: 85,
          complianceStatus: "Cumple",
        }),
      },
    ];

    (collection as jest.Mock).mockReturnValue("collectionRef");
    (query as jest.Mock).mockReturnValue("queryRef");
    (where as jest.Mock).mockReturnValue("whereCondition");
    (getDocs as jest.Mock).mockResolvedValue({ empty: false, docs: mockDocs });

    await getComplianceReportsController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([
      {
        id: "report1",
        userId: "user123",
        totalScore: 85,
        complianceStatus: "Cumple",
      },
    ]);
  });

  it("debe retornar 404 si no hay reports", async () => {
    (collection as jest.Mock).mockReturnValue("collectionRef");
    (query as jest.Mock).mockReturnValue("queryRef");
    (where as jest.Mock).mockReturnValue("whereCondition");
    (getDocs as jest.Mock).mockResolvedValue({ empty: true, docs: [] });

    await getComplianceReportsController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "No hay autoevaluaciones completadas.",
    });
  });

  it("debe retornar 400 si ocurre un error", async () => {
    (collection as jest.Mock).mockImplementation(() => {
      throw { code: "permission-denied" };
    });

    await getComplianceReportsController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Permiso denegado.",
    });
  });
});
