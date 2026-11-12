import { Request, Response } from "express";
import {
  createOrUpdateAudit,
  getAuditsBySelfAssessmentId,
} from "../controllers/auditController.js";
import { arrayUnion, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";

jest.mock("../utils/firebaseConfig.js", () => ({ firestore: {} }));

jest.mock("firebase/firestore", () => ({
  arrayUnion: jest.fn((value) => ({ value })),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  where: jest.fn(),
}));

const response = (): Response =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

const request = (body = {}): Request =>
  ({ body, params: { selfAssessmentId: "assessment-1" } }) as unknown as Request;

const sectionAudit = {
  sectionId: "section-1",
  score: 80,
  observations: "Revisión completada",
};

describe("auditController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (arrayUnion as jest.Mock).mockImplementation((value) => ({ value }));
    (query as jest.Mock).mockReturnValue("query-ref");
  });

  it("rechaza una sección que ya fue auditada", async () => {
    const res = response();
    (getDocs as jest.Mock).mockResolvedValueOnce({ empty: false });

    await createOrUpdateAudit(
      request({
        selfAssessmentId: "assessment-1",
        auditorId: "auditor-1",
        auditorName: "Auditor",
        sectionAudit,
      }),
      res
    );

    expect(res.status).toHaveBeenCalledWith(409);
    expect(setDoc).not.toHaveBeenCalled();
  });

  it("crea una auditoría nueva para una sección", async () => {
    const res = response();
    (getDocs as jest.Mock).mockResolvedValueOnce({ empty: true });
    (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
    (doc as jest.Mock).mockReturnValue("audit-ref");

    await createOrUpdateAudit(
      request({
        selfAssessmentId: "assessment-1",
        auditorId: "auditor-1",
        auditorName: "Auditor",
        sectionAudit,
      }),
      res
    );

    expect(setDoc).toHaveBeenCalledWith(
      "audit-ref",
      expect.objectContaining({
        selfAssessmentId: "assessment-1",
        sectionAudits: [sectionAudit],
        sectionAuditIds: ["section-1"],
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("agrega una sección a una auditoría existente", async () => {
    const res = response();
    (getDocs as jest.Mock).mockResolvedValueOnce({ empty: true });
    (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => true });
    (doc as jest.Mock).mockReturnValue("audit-ref");

    await createOrUpdateAudit(
      request({
        selfAssessmentId: "assessment-1",
        auditorId: "auditor-1",
        auditorName: "Auditor",
        sectionAudit,
      }),
      res
    );

    expect(updateDoc).toHaveBeenCalledWith(
      "audit-ref",
      expect.objectContaining({
        sectionAudits: { value: sectionAudit },
        sectionAuditIds: { value: "section-1" },
      })
    );
    expect(arrayUnion).toHaveBeenCalledTimes(2);
  });

  it("devuelve 404 si una evaluación no tiene auditorías", async () => {
    const res = response();
    (getDocs as jest.Mock).mockResolvedValueOnce({ empty: true });

    await getAuditsBySelfAssessmentId(request(), res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("devuelve las auditorías de una evaluación", async () => {
    const res = response();
    (getDocs as jest.Mock).mockResolvedValueOnce({
      empty: false,
      docs: [{ id: "audit-1", data: () => ({ auditorId: "auditor-1" }) }],
    });

    await getAuditsBySelfAssessmentId(request(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: "audit-1", auditorId: "auditor-1" }]);
  });
});
