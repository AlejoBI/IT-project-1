import express from "express";
import {
  createOrUpdateAudit,
  getAuditsBySelfAssessmentId,
} from "../controllers/auditController.js";
import { validate } from "../middlewares/validate.js";
import { auditSchema } from "../schemas/auditSchemas.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/create", validate(auditSchema), createOrUpdateAudit);
router.get("/:selfAssessmentId", getAuditsBySelfAssessmentId);

export default router;
