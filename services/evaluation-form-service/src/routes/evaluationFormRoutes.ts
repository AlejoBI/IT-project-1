import { Router } from "express";
import {
  createFullEvaluationForm,
  addEvaluationForm,
  getEvaluationFormByRegulationId,
  updateEvaluationForm,
  deleteEvaluationFormByRegulationId,
} from "../controllers/evaluationFormController.js";
import { validate } from "../middlewares/validate.js";
import {
  fullEvaluationFormSchema,
  evaluationFormSchema,
  evaluationFormUpdateSchema,
} from "../schemas/evaluationFormSchema.js";

const router = Router();

router.post(
  "/full",
  validate(fullEvaluationFormSchema),
  createFullEvaluationForm
); 
router.post("/", validate(evaluationFormSchema), addEvaluationForm);
router.get("/:regulationId", getEvaluationFormByRegulationId);
router.put(
  "/:formId",
  validate(evaluationFormUpdateSchema),
  updateEvaluationForm
);
router.delete("/:regulationId", deleteEvaluationFormByRegulationId);

export default router;
