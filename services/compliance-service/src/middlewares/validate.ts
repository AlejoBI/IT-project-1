import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): any => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log("Validation error:", result.error.errors[0]);
      const firstError = result.error.errors[0];
      return res.status(400).json({
        error: firstError.message,
      });
    }

    next();
  };
