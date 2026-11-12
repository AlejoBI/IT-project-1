// routes/complianceReportRoutes.ts
import { Router } from "express";
import {
  createComplianceReport,
  getComplianceReportsController,
} from "../controllers/complianceReportController.js";
import { requireUserAccess } from "../middlewares/authorize.js";
import { requireReportAccess } from "../middlewares/authorize.js";
import { validate } from "../middlewares/validate.js";
import { createReportAction, getReportActions, getReportActionHistory, updateReportAction } from "../controllers/reportActionController.js";
import { createReportActionSchema, updateReportActionSchema } from "../schemas/reportActionSchemas.js";

const router = Router();

router.post("/create", createComplianceReport);
router.get("/:reportId/actions", requireReportAccess, getReportActions);
router.get("/:reportId/history", requireReportAccess, getReportActionHistory);
router.post("/:reportId/actions", requireReportAccess, validate(createReportActionSchema), createReportAction);
router.patch(
  "/:reportId/actions/:actionId",
  requireReportAccess,
  validate(updateReportActionSchema),
  updateReportAction
);
router.get("/:userId", requireUserAccess("params", "userId", "admin", "auditor"), getComplianceReportsController);

export default router;
