import { Router } from "express";
import {
  registerGuest,
  getAllGuests,
  getGuest,
} from "../controllers/guest.controllers.js";

const router = Router();

router.post("/register", registerGuest);
router.get("/get-guest/:id", getGuest);
router.get("/get-all-guests", getAllGuests);

export default router;
