import { Router } from "express";
import { register, getAllUsers } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", register);
router.get("/get-all-users", getAllUsers);

export default router;
