import express from "express";
import { getUsers, getUser, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:uid", getUser);
router.put("/:uid", updateUser);

export default router;
