import { Request, Response } from "express";
import { requireRole, requireSelfOrRole } from "../middlewares/authorize";

const createResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

describe("authorization middleware", () => {
  it("permite un rol autorizado", () => {
    const request = { auth: { role: "admin" } } as unknown as Request;
    const response = createResponse();
    const next = jest.fn();

    requireRole("admin")(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it("rechaza un rol no autorizado", () => {
    const request = { auth: { role: "standard_user" } } as unknown as Request;
    const response = createResponse();
    const next = jest.fn();

    requireRole("admin")(request, response, next);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("permite al propietario acceder a su propio recurso", () => {
    const request = {
      auth: { uid: "user-1" },
      params: { uid: "user-1" },
    } as unknown as Request;
    const response = createResponse();
    const next = jest.fn();

    requireSelfOrRole("uid", "admin")(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
