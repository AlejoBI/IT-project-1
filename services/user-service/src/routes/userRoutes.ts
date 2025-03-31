import express from "express";
import { getUsers, getUser, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:uid", getUser);
router.put("/users/:uid", updateUser);

export default router;
