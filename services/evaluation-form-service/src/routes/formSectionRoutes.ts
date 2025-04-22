import { Router } from "express";
import {
  addFormSection,
  getFormSections,
  getFormSection,
  updateFormSection,
  deleteFormSection,
} from "../controllers/sectionsController.js";
import { validate } from "../middlewares/validate.js";
import {
  formSectionSchema,
  formSectionUpdateSchema,
} from "../schemas/evaluationFormSchema.js";

const router = Router();

router.post("/", validate(formSectionSchema), addFormSection);
router.get("/form/:formId", getFormSections);
router.get("/:formId/:sectionId", getFormSection);
router.put("/:sectionId", validate(formSectionUpdateSchema), updateFormSection);
router.delete("/:sectionId", deleteFormSection);

export default router;
