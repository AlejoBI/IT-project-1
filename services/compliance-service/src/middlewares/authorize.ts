import { Request, Response, NextFunction } from "express";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig.js";

type Role = "admin" | "auditor" | "standard_user";

const roleOf = (req: Request): Role | undefined => {
  const role = req.auth?.role;
  return role === "admin" || role === "auditor" || role === "standard_user" ? role : undefined;
};

const allows = (req: Request, userId: string | undefined, roles: Role[]): boolean => {
  const role = roleOf(req);
  return req.auth?.uid === userId || Boolean(role && roles.includes(role));
};

export const requireUserAccess = (source: "body" | "params", parameter: string, ...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const container = source === "body" ? req.body : req.params;
    if (!allows(req, container[parameter], roles)) {
      res.status(403).json({ error: "No tienes permisos para acceder a estos datos" });
      return;
    }
    next();
  };

export const requireRole = (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const role = roleOf(req);
    if (!role || !roles.includes(role)) {
      res.status(403).json({ error: "No tienes permisos para esta operación" });
      return;
    }
    next();
  };

export const requireAssessmentAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const snapshot = await getDoc(doc(firestore, "selfAssessments", req.params.selfAssessmentId));
    if (!snapshot.exists()) {
      res.status(404).json({ error: "No existe la autoevaluación solicitada." });
      return;
    }

    const role = roleOf(req);
    if (snapshot.data().userId !== req.auth?.uid && role !== "admin" && role !== "auditor") {
      res.status(403).json({ error: "No tienes permisos para acceder a esta evaluación." });
      return;
    }
    next();
  } catch {
    res.status(500).json({ error: "No se pudo validar el acceso a la evaluación." });
  }
};
