import { Request, Response, NextFunction } from "express";
import { getAdminAuth } from "../utils/firebaseAdmin.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization = req.header("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : undefined;

  if (!token) {
    res.status(401).json({ error: "Se requiere un token de autenticación", code: "AUTH_REQUIRED" });
    return;
  }

  try {
    req.auth = await getAdminAuth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Token de autenticación inválido o expirado", code: "AUTH_INVALID" });
  }
};
