// routes/complianceReportRoutes.ts
import { Router } from "express";
import { getComplianceReportByUser } from "../controllers/complianceReportController";

const router = Router();

router.get("/:userId", getComplianceReportByUser);

export default router;
