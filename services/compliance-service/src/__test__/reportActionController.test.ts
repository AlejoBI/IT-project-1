import { Request, Response } from "express";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import {
  createReportAction,
  getReportActions,
  getReportActionHistory,
  updateReportAction,
} from "../controllers/reportActionController.js";

jest.mock("../utils/firebaseConfig.js", () => ({ firestore: {} }));
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  updateDoc: jest.fn(),
  where: jest.fn(),
}));

const response = (): Response =>
  ({ status: jest.fn().mockReturnThis(), json: jest.fn() }) as unknown as Response;

const request = (body = {}): Request =>
  ({ params: { reportId: "report-1", actionId: "action-1" }, body }) as unknown as Request;

describe("reportActionController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (doc as jest.Mock).mockReturnValue("report-ref");
    (collection as jest.Mock).mockReturnValue("collection-ref");
    (query as jest.Mock).mockReturnValue("query-ref");
  });

  it("crea una acción asociada al propietario del reporte", async () => {
    const res = response();
    (getDoc as jest.Mock).mockResolvedValue({ exists: () => true, data: () => ({ userId: "user-1" }) });
    (addDoc as jest.Mock).mockResolvedValue({ id: "action-1" });

    await createReportAction(request({ title: "Revisar control", status: "pendiente" }), res);

    expect(addDoc).toHaveBeenCalledWith(
      "collection-ref",
      expect.objectContaining({ reportId: "report-1", userId: "user-1", title: "Revisar control" })
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("consulta las acciones por reporte", async () => {
    const res = response();
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [{ id: "action-1", data: () => ({ title: "Acción", status: "pendiente" }) }],
    });

    await getReportActions(request(), res);

    expect(where).toHaveBeenCalledWith("reportId", "==", "report-1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: "action-1", title: "Acción", status: "pendiente" }]);
  });

  it("actualiza una acción del reporte", async () => {
    const res = response();
    (getDoc as jest.Mock).mockResolvedValue({ exists: () => true, data: () => ({ reportId: "report-1" }) });

    await updateReportAction(request({ status: "resuelta" }), res);

    expect(updateDoc).toHaveBeenCalledWith("report-ref", expect.objectContaining({ status: "resuelta" }));
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("devuelve el historial ordenado por fecha", async () => {
    const res = response();
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        { id: "change-old", data: () => ({ changedAt: "2026-01-01T00:00:00.000Z", type: "created" }) },
        { id: "change-new", data: () => ({ changedAt: "2026-02-01T00:00:00.000Z", type: "updated" }) },
      ],
    });

    await getReportActionHistory(request(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ id: "change-new" }),
      expect.objectContaining({ id: "change-old" }),
    ]);
  });
});
