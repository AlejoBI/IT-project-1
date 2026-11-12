import { Request, Response } from "express";
import { requireRole, requireUserAccess } from "../middlewares/authorize";

const response = () =>
  ({ status: jest.fn().mockReturnThis(), json: jest.fn() }) as unknown as Response;

describe("compliance authorization", () => {
  it("permite al propietario de la evaluación", () => {
    const req = { auth: { uid: "user-1" }, body: { userId: "user-1" } } as unknown as Request;
    const res = response();
    const next = jest.fn();

    requireUserAccess("body", "userId", "admin")(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("rechaza acceso a datos de otro usuario", () => {
    const req = { auth: { uid: "user-1" }, params: { userId: "user-2" } } as unknown as Request;
    const res = response();
    const next = jest.fn();

    requireUserAccess("params", "userId", "admin")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("permite el rol auditor en rutas de auditoría", () => {
    const req = { auth: { role: "auditor" } } as unknown as Request;
    const res = response();
    const next = jest.fn();

    requireRole("admin", "auditor")(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
