import { Request, Response } from "express";
import { NotificationController } from "../controllers/notificationController";
import { sendEmail } from "../service/notificationService";

// Mock de sendEmail
jest.mock("../service/notificationService", () => ({
  sendEmail: jest.fn(),
}));

describe("NotificationController", () => {
  let notificationController: NotificationController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    notificationController = new NotificationController();
    mockReq = {
      body: {
        to: "test@example.com",
        subject: "Test Subject",
        htmlContent: "<p>Test HTML content</p>",
        textContent: "Test text content",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería enviar una notificación correctamente", async () => {
    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    await notificationController.sendNotification(
      mockReq as Request,
      mockRes as Response
    );

    expect(sendEmail).toHaveBeenCalledWith(
      "test@example.com",
      "Test Subject",
      "<p>Test HTML content</p>",
      "Test text content"
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Correo electrónico enviado exitosamente",
    });
  });

  it("debería manejar error al enviar notificación", async () => {
    (sendEmail as jest.Mock).mockRejectedValue(
      new Error("Error al enviar el correo electrónico")
    );

    await notificationController.sendNotification(
      mockReq as Request,
      mockRes as Response
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Error al enviar el correo electrónico",
    });
  });

  it("debería devolver error si faltan campos requeridos", async () => {
    mockReq.body = {}; // No pasa los campos necesarios

    await notificationController.sendNotification(
      mockReq as Request,
      mockRes as Response
    );

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Faltan campos requeridos",
    });
  });
});
