import { Router } from "express";
import {
  registerSupplier,
  getAllSuppliers,
} from "../controllers/suppliers.controllers.js";

const router = Router();

router.post("/register", registerSupplier);
router.get("/get-all-suppliers", getAllSuppliers);

export default router;
