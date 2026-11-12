import { Router } from "express";
import {
  saveDraftController,
  getDraftController,
  submitSelfAssessmentController,
  getSelfAssessmentController,
  getSelfAssessmentToAuditsByUserId,
  getSelfAssessmentByAssessmentId,
} from "../controllers/selfAssessmentController.js";
import { validate } from "../middlewares/validate.js";
import { saveDraftSchema, submitAssessmentSchema } from "../schemas/selfAssessmentSchemas.js";
import { requireAssessmentAccess, requireRole, requireUserAccess } from "../middlewares/authorize.js";

const router = Router();

router.get(
  "/draft/:regulationId/:userId",
  requireUserAccess("params", "userId", "admin", "auditor"),
  getDraftController
);
router.post(
  "/save",
  validate(saveDraftSchema),
  requireUserAccess("body", "userId", "admin"),
  saveDraftController
);
router.post(
  "/submit",
  validate(submitAssessmentSchema),
  requireUserAccess("body", "userId", "admin"),
  submitSelfAssessmentController
);
router.get("/for-audits/:userId", requireRole("admin", "auditor"), getSelfAssessmentToAuditsByUserId);
router.get("/assessment/:selfAssessmentId", requireAssessmentAccess, getSelfAssessmentByAssessmentId);
router.get("/:userId", requireUserAccess("params", "userId", "admin", "auditor"), getSelfAssessmentController);

export default router;
