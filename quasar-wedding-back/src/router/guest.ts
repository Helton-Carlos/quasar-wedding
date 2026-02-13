import { Router } from "express";
import {
  registerGuest,
  getAllGuests,
  getGuest,
  updateGuest,
  deleteGuest,
} from "../controllers/guest.controllers.js";

const router = Router();

router.post("/register", registerGuest);
router.get("/get-guest/:id", getGuest);
router.get("/get-all-guests", getAllGuests);
router.put("/update-guest/:id", updateGuest);
router.delete("/delete-guest/:id", deleteGuest);

export default router;
