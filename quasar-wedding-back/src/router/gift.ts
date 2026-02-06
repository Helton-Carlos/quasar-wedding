import { Router } from "express";
import { registerGift, getAllGifts } from "../controllers/gift.controllers.js";

const router = Router();

router.post("/register", registerGift);
router.get("/get-all-gifts", getAllGifts);

export default router;
