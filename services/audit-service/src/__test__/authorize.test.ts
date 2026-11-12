import { Request, Response } from "express";
import { requireRole } from "../middlewares/authorize";

const response = () =>
  ({ status: jest.fn().mockReturnThis(), json: jest.fn() }) as unknown as Response;

describe("audit authorization", () => {
  it("permite a un auditor", () => {
    const req = { auth: { role: "auditor" } } as unknown as Request;
    const res = response();
    const next = jest.fn();

    requireRole("admin", "auditor")(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("rechaza a un usuario estándar", () => {
    const req = { auth: { role: "standard_user" } } as unknown as Request;
    const res = response();
    const next = jest.fn();

    requireRole("admin", "auditor")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
