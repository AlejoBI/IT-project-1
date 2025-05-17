import { Router } from "express";
import {
  saveDraftController,
  getDraftController,
  submitSelfAssessmentController,
  getSelfAssessmentController,
  getSelfAssessmentToAuditsByUserId,
  getSelfAssessmentByAssessmentId
} from "../controllers/selfAssessmentController.js";
import { validate } from "../middlewares/validate.js";
import {
  saveDraftSchema,
  submitAssessmentSchema,
} from "../schemas/selfAssessmentSchemas.js";

const router = Router();

router.get("/draft/:regulationId/:userId", getDraftController);
router.post("/save", validate(saveDraftSchema), saveDraftController);
router.post(
  "/submit",
  validate(submitAssessmentSchema),
  submitSelfAssessmentController
);
router.get("/for-audits/:userId", getSelfAssessmentToAuditsByUserId);
router.get("/:userId", getSelfAssessmentController);
router.get("/assessment/:selfAssessmentId", getSelfAssessmentByAssessmentId);

export default router;
