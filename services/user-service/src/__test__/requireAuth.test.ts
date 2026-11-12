import { Request, Response } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { getAdminAuth } from "../utils/firebaseAdmin";

jest.mock("../utils/firebaseAdmin", () => ({
  getAdminAuth: jest.fn(),
}));

const mockedGetAdminAuth = getAdminAuth as jest.MockedFunction<typeof getAdminAuth>;

const createResponse = () =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }) as unknown as Response;

describe("requireAuth", () => {
  beforeEach(() => jest.clearAllMocks());

  it("rechaza solicitudes sin bearer token", async () => {
    const response = createResponse();
    const next = jest.fn();

    await requireAuth({ header: () => undefined } as unknown as Request, response, next);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("adjunta el token verificado y continúa", async () => {
    const decodedToken = { uid: "user-1", email: "user@example.com" } as never;
    mockedGetAdminAuth.mockReturnValue({ verifyIdToken: jest.fn().mockResolvedValue(decodedToken) } as never);
    const request = { header: () => "Bearer token" } as unknown as Request;
    const response = createResponse();
    const next = jest.fn();

    await requireAuth(request, response, next);

    expect(request.auth).toBe(decodedToken);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
