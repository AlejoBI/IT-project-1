import express from "express";
import {
  createOrUpdateAudit,
  getAuditsBySelfAssessmentId,
} from "../controllers/auditController.js";
import { validate } from "../middlewares/validate.js";
import { auditSchema } from "../schemas/auditSchemas.js";

const router = express.Router();

router.post("/create", validate(auditSchema), createOrUpdateAudit);
router.get("/:selfAssessmentId", getAuditsBySelfAssessmentId);

export default router;
