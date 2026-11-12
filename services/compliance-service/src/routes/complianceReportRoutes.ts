// routes/complianceReportRoutes.ts
import { Router } from "express";
import {
  createComplianceReport,
  getComplianceReportsController,
} from "../controllers/complianceReportController.js";
import { requireUserAccess } from "../middlewares/authorize.js";

const router = Router();

router.post("/create", createComplianceReport);
router.get("/:userId", requireUserAccess("params", "userId", "admin", "auditor"), getComplianceReportsController);

export default router;
