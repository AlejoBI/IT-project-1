import express from "express";
import { register, login, logout, recoverPassword } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema, recoverPasswordSchema } from "../schemas/authSchemas.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.post("/recover-password", validate(recoverPasswordSchema), recoverPassword);

export default router;
