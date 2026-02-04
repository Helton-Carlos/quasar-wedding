import { Router } from "express";
import {
  registerGuest,
  getAllGuests,
} from "../controllers/guest.controllers.js";

const router = Router();

router.post("/register", registerGuest);
router.get("/get-all-guests", getAllGuests);

export default router;
