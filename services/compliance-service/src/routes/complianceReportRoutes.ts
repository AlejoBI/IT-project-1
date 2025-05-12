// routes/complianceReportRoutes.ts
import { Router } from "express";
import {
  createComplianceReport,
  getComplianceReportsController,
} from "../controllers/complianceReportController.js";

const router = Router();

router.post("/create", createComplianceReport);
router.get("/:userId", getComplianceReportsController);

export default router;
