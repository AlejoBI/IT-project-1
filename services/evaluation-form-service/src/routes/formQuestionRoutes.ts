import { Router } from "express";
import {
  addFormQuestion,
  getFormQuestions,
  updateFormQuestion,
  deleteFormQuestion,
} from "../controllers/questionsController.js";
import { validate } from "../middlewares/validate.js";
import {
  formQuestionSchema,
  formQuestionUpdateSchema,
} from "../schemas/evaluationFormSchema.js";

const router = Router();

router.post("/", validate(formQuestionSchema), addFormQuestion);
router.get("/:sectionId", getFormQuestions);
router.put(
  "/:questionId",
  validate(formQuestionUpdateSchema),
  updateFormQuestion
);
router.delete("/:questionId", deleteFormQuestion);

export default router;
