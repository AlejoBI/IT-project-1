// routes/complianceReportRoutes.ts
import { Router } from "express";
import { createComplianceReport } from "../controllers/complianceReportController.js";

const router = Router();

router.post("/create", createComplianceReport);

export default router;
