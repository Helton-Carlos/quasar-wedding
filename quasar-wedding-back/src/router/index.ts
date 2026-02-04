import { Router } from "express";
import userRouter from "./user.js";
import guestRouter from "./guest.js";

const router = Router();

router.use("/user", userRouter);
router.use("/guest", guestRouter);

export default router;
