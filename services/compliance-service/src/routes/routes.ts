// routes/index.ts
import { Router } from "express";
import selfAssessmentRoutes from "./selfAssessmentRoutes.js";
import complianceReportRoutes from "./complianceReportRoutes.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.use("/self-assessments", selfAssessmentRoutes);
router.use("/compliance-reports", complianceReportRoutes);

export default router;
