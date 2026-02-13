import { Router } from "express";
import {
  registerGift,
  getAllGifts,
  updatedGift,
  deleteGift,
} from "../controllers/gift.controllers.js";

const router = Router();

router.post("/register", registerGift);
router.get("/get-all-gifts", getAllGifts);
router.put("/update-gift/:id", updatedGift);
router.delete("/delete-gift/:id", deleteGift);

export default router;
