import { Request, Response, NextFunction } from "express";

type Role = "admin" | "auditor" | "standard_user";

const getRole = (req: Request): Role | undefined => {
  const role = req.auth?.role;
  return role === "admin" || role === "auditor" || role === "standard_user" ? role : undefined;
};

export const requireRole = (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const role = getRole(req);
    if (!role || !roles.includes(role)) {
      res.status(403).json({ error: "No tienes permisos para esta operación" });
      return;
    }
    next();
  };
