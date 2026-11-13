import express from "express";
import {
  createOrUpdateAudit,
  getAuditsBySelfAssessmentId,
  getAdminAuditEvents,
  getSystemHealth,
} from "../controllers/auditController.js";
import { validate } from "../middlewares/validate.js";
import { auditSchema } from "../schemas/auditSchemas.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requireRole } from "../middlewares/authorize.js";

const router = express.Router();

router.use(requireAuth);

router.post("/create", requireRole("admin", "auditor"), validate(auditSchema), createOrUpdateAudit);
router.get("/events", requireRole("admin"), getAdminAuditEvents);
router.get("/system-health", requireRole("admin"), getSystemHealth);
router.get("/:selfAssessmentId", requireRole("admin", "auditor"), getAuditsBySelfAssessmentId);

export default router;
