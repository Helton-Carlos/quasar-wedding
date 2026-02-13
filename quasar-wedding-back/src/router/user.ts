import { Router } from "express";
import {
  register,
  getAllUsers,
  signIn,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", register);
router.get("/get-all-users", getAllUsers);
router.post("/sign-in", signIn);

export default router;
