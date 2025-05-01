import { Router } from "express";
import {
  saveDraftController,
  getDraftController,
  submitSelfAssessmentController,
} from "../controllers/selfAssessmentController";
import { validate } from "../middlewares/validate";
import {
  saveDraftSchema,
  submitAssessmentSchema,
} from "../schemas/selfAssessmentSchemas";

const router = Router();

router.post("/draft", validate(saveDraftSchema), saveDraftController);
router.get("/draft/:userId/:formId", getDraftController);
router.post(
  "/submit",
  validate(submitAssessmentSchema),
  submitSelfAssessmentController
);

export default router;
