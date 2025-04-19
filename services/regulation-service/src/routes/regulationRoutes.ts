import express from "express";
import {
  addRegulation,
  getRegulations,
  getRegulation,
  updateRegulation,
  deleteRegulation,
} from "../controllers/regulationController.js";
import { validate } from "../middlewares/validate.js";
import {
  addRegulationSchema,
  updateRegulationSchema,
} from "../schemas/regulationSchemas.js";

const router = express.Router();

router.post("/", validate(addRegulationSchema), addRegulation);
router.get("/", getRegulations);
router.get("/:id", getRegulation);
router.put("/:id", validate(updateRegulationSchema), updateRegulation);
router.delete("/:id", deleteRegulation);

export default router;
