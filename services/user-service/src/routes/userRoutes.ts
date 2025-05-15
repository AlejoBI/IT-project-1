import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  getUsersWithEvaluationsAndAudits,
} from "../controller/userController.js";
import { validate } from "../middlewares/validate.js";
import { updateUserSchema } from "../schemas/userSchemas.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/audit", getUsersWithEvaluationsAndAudits);
router.get("/:uid", getUser);
router.put("/:uid", validate(updateUserSchema), updateUser);

export default router;
