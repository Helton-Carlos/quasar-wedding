import { Router } from "express";
import { register, getTest } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", register);
router.get("/test", getTest);

export default router;
