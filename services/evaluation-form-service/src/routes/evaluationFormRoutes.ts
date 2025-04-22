import { Router } from "express";
import {
  createFullEvaluationForm,
  addEvaluationForm,
  getEvaluationForms,
  getEvaluationForm,
  updateEvaluationForm,
  deleteEvaluationForm,
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
router.get("/", getEvaluationForms);
router.get("/:formId", getEvaluationForm);
router.put(
  "/:formId",
  validate(evaluationFormUpdateSchema),
  updateEvaluationForm
);
router.delete("/:formId", deleteEvaluationForm);

export default router;
