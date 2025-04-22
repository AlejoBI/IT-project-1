import { Router } from "express";
import evaluationFormRoutes from "./evaluationFormRoutes.js";
import formSectionRoutes from "./formSectionRoutes.js";
import formQuestionRoutes from "./formQuestionRoutes.js";

const router = Router();

router.use("/forms", evaluationFormRoutes);
router.use("/sections", formSectionRoutes);
router.use("/questions", formQuestionRoutes);

export default router;
