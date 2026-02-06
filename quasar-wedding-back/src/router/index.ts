import { Router } from "express";
import userRouter from "./user.js";
import guestRouter from "./guest.js";
import supplierRouter from "./supplier.js";
import giftRouter from "./gift.js";

const router = Router();

router.use("/user", userRouter);
router.use("/guest", guestRouter);
router.use("/supplier", supplierRouter);
router.use("/gift", giftRouter);

export default router;
