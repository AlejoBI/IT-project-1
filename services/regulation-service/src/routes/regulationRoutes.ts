import express from "express";
import {
  addRegulation,
  getRegulations,
  getRegulation,
  updateRegulation,
  deleteRegulation,
} from "../controllers/regulationController.js";

const router = express.Router();

router.post("/", addRegulation); 
router.get("/", getRegulations); 
router.get("/:id", getRegulation); 
router.put("/:id", updateRegulation);
router.delete("/:id", deleteRegulation);

export default router;