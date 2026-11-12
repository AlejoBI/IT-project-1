import { Request, Response, NextFunction } from "express";

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
