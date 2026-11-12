import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  getUsersWithEvaluationsAndAudits,
} from "../controller/userController.js";
import { validate } from "../middlewares/validate.js";
import { updateUserSchema } from "../schemas/userSchemas.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { requireRole, requireSelfOrRole } from "../middlewares/authorize.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", requireRole("admin"), getUsers);
router.get("/audit", requireRole("admin", "auditor"), getUsersWithEvaluationsAndAudits);
router.get("/:uid", requireSelfOrRole("uid", "admin"), getUser);
router.put(
  "/:userId",
  requireSelfOrRole("userId", "admin"),
  validate(updateUserSchema),
  updateUser
);

export default router;
