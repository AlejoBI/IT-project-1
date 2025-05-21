jest.mock("../controllers/complianceReportController", () => ({
  createComplianceReport: jest.fn(),
}));

import { Request, Response } from "express";
import {
  saveDraftController,
  getDraftController,
  submitSelfAssessmentController,
  getSelfAssessmentController,
  getSelfAssessmentToAuditsByUserId,
  getSelfAssessmentByAssessmentId,
} from "../controllers/selfAssessmentController";
import { calculateScores } from "../services/calculateScores";

import * as complianceReportController from "../controllers/complianceReportController";

jest.mock("../utils/firebaseConfig", () => ({
  firestore: {},
}));

jest.mock("../services/calculateScores", () => ({
  calculateScores: jest.fn(),
}));

const mockFirestore = {
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
};

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => mockFirestore.collection()),
  doc: jest.fn(() => mockFirestore.doc()),
  setDoc: jest.fn((...args) => mockFirestore.setDoc(...args)),
  updateDoc: jest.fn((...args) => mockFirestore.updateDoc(...args)),
  getDocs: jest.fn((...args) => mockFirestore.getDocs(...args)),
  getDoc: jest.fn((...args) => mockFirestore.getDoc(...args)),
  query: jest.fn((...args) => mockFirestore.query(...args)),
  where: jest.fn((...args) => mockFirestore.where(...args)),
  addDoc: jest.fn((...args) => mockFirestore.addDoc(...args)),
}));

describe("saveDraftController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("crea una nueva sesión si no existe una en progreso", async () => {
    const req = {
      body: {
        userId: "user1",
        regulationId: "reg1",
        formId: "form1",
        sectionId: "sec1",
        sectionTitle: "Intro",
        answers: [{ questionId: "q1", response: "yes" }],
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;

    mockFirestore.getDocs.mockResolvedValue({ empty: true });
    mockFirestore.addDoc.mockResolvedValue({});

    await saveDraftController(req, res);

    expect(mockFirestore.addDoc).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Nueva evaluación iniciada y avance guardado.",
    });
  });

  it("actualiza una sesión existente", async () => {
    const req = {
      body: {
        userId: "user1",
        regulationId: "reg1",
        formId: "form1",
        sectionId: "sec1",
        sectionTitle: "Intro",
        answers: [{ sectionId: "sec1", questionId: "q1", response: "yes" }],
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any as Response;

    mockFirestore.getDocs.mockResolvedValue({
      empty: false,
      docs: [
        {
          ref: {},
          data: () => ({
            answers: [],
            completedSections: [],
          }),
        },
      ],
    });

    mockFirestore.updateDoc.mockResolvedValue({});

    await saveDraftController(req, res);

    expect(mockFirestore.updateDoc).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Avance actualizado exitosamente.",
    });
  });
});

describe("getDraftController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve 404 si no hay avance guardado", async () => {
    const req = {
      params: { userId: "user1", regulationId: "reg1" },
    } as unknown as Request;

    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    mockFirestore.getDocs.mockResolvedValue({ empty: true });

    await getDraftController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No hay avance guardado para esta normativa.",
    });
  });

  it("devuelve el avance si existe", async () => {
    const req = {
      params: { userId: "user1", regulationId: "reg1" },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    mockFirestore.getDocs.mockResolvedValue({
      empty: false,
      docs: [{ data: () => ({ foo: "bar" }) }],
    });

    await getDraftController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ foo: "bar" });
  });
});

describe("submitSelfAssessmentController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve 404 si no hay evaluación en progreso", async () => {
    const req = {
      body: {
        userId: "user1",
        regulationId: "reg1",
        regulationName: "Reg 1",
        formId: "form1",
        formName: "Form 1",
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    mockFirestore.getDocs.mockResolvedValue({ empty: true });

    await submitSelfAssessmentController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No existe evaluación en progreso para enviar.",
    });
  });

  it("envía autoevaluación exitosamente", async () => {
    const req = {
      body: {
        userId: "user1",
        regulationId: "reg1",
        regulationName: "Reg 1",
        formId: "form1",
        formName: "Form 1",
      },
    } as Request;

    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const draft = {
      answers: [{ questionId: "q1", response: "yes" }],
    };

    mockFirestore.getDocs.mockResolvedValue({
      empty: false,
      docs: [{ ref: { id: "mockSelfAssessmentId" }, data: () => draft }],
    });

    (calculateScores as jest.Mock).mockReturnValue({
      totalScore: 100,
      sectionScores: [{ sectionId: "sec1", sectionTitle: "Intro", score: 50 }],
    });

    // Mockea doc para devolver un objeto con id
    mockFirestore.doc.mockReturnValue({ id: "mockSelfAssessmentId" });

    mockFirestore.setDoc.mockResolvedValue({});
    mockFirestore.updateDoc.mockResolvedValue({});

    (
      complianceReportController.createComplianceReport as jest.Mock
    ).mockResolvedValue(undefined);

    await submitSelfAssessmentController(req, res);

    expect(mockFirestore.setDoc).toHaveBeenCalled();
    expect(
      complianceReportController.createComplianceReport
    ).toHaveBeenCalledWith({
      userId: req.body.userId,
      selfAssessmentId: "mockSelfAssessmentId",
      regulationId: req.body.regulationId,
      regulationName: req.body.regulationName,
      formId: req.body.formId,
      formName: req.body.formName,
      totalScore: 100,
      sectionScores: [{ sectionId: "sec1", sectionTitle: "Intro", score: 50 }],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Autoevaluación enviada exitosamente.",
    });
  });

  it("devuelve 404 si no hay autoevaluaciones completadas o iniciadas", async () => {
    const req = { params: { userId: "user1" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDocs.mockResolvedValue({ empty: true });

    await getSelfAssessmentController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No hay autoevaluaciones completadas o iniciadas.",
    });
  });

  it("devuelve 404 si no hay autoevaluaciones completadas para auditoría", async () => {
    const req = { params: { userId: "user1" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDocs.mockResolvedValue({ empty: true });

    await getSelfAssessmentToAuditsByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No hay autoevaluaciones completadas.",
    });
  });

  it("devuelve 404 si no existe la autoevaluación con ese ID", async () => {
    const req = { params: { selfAssessmentId: "id1" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDoc.mockResolvedValue({ exists: () => false });

    await getSelfAssessmentByAssessmentId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "No hay autoevaluaciones completadas con ese ID.",
    });
  });

  it("devuelve 400 si ocurre un error inesperado al obtener autoevaluación por ID", async () => {
    const req = { params: { selfAssessmentId: "id1" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDoc.mockRejectedValue(new Error("Firestore error"));

    await getSelfAssessmentByAssessmentId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });

  it("devuelve 400 si ocurre un error inesperado al obtener autoevaluación por ID", async () => {
    const req = { params: { selfAssessmentId: "id1" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDoc.mockRejectedValue(new Error("Firestore error"));

    await getSelfAssessmentByAssessmentId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });

  it("devuelve 400 si ocurre un error inesperado al obtener draft", async () => {
    const req = { params: { userId: "u", regulationId: "r" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDocs.mockRejectedValue(new Error("Firestore error"));

    await getDraftController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });

  it("devuelve 400 si ocurre un error inesperado al enviar autoevaluación", async () => {
    const req = {
      body: {
        userId: "u",
        regulationId: "r",
        regulationName: "n",
        formId: "f",
        formName: "fn",
      },
    } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDocs.mockResolvedValue({
      empty: false,
      docs: [
        { ref: { id: "mockSelfAssessmentId" }, data: () => ({ answers: [] }) },
      ],
    });
    (calculateScores as jest.Mock).mockReturnValue({
      totalScore: 100,
      sectionScores: [],
    });
    mockFirestore.doc.mockReturnValue({ id: "mockSelfAssessmentId" });
    mockFirestore.setDoc.mockRejectedValue(new Error("Firestore error"));

    await submitSelfAssessmentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    // Verifica que el error sea un objeto Error o un string
    const errorArg = res.json.mock.calls[0][0].error;
    expect(
      typeof errorArg === "string" || errorArg instanceof Error
    ).toBeTruthy();
  });

  it("devuelve 400 si ocurre un error inesperado al obtener autoevaluaciones", async () => {
    const req = { params: { userId: "u" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDocs.mockRejectedValue(new Error("Firestore error"));

    await getSelfAssessmentController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });

  it("devuelve 400 si ocurre un error inesperado al obtener autoevaluaciones para auditoría", async () => {
    const req = { params: { userId: "u" } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    mockFirestore.getDocs.mockRejectedValue(new Error("Firestore error"));

    await getSelfAssessmentToAuditsByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
  });
});
