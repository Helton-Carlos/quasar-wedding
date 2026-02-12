import { Router } from "express";
import {
  registerSupplier,
  getAllSuppliers,
  getSupplier,
} from "../controllers/suppliers.controllers.js";

const router = Router();

router.post("/register", registerSupplier);
router.get("/get-all-suppliers", getAllSuppliers);
router.get("/get-supplier/:id", getSupplier);

export default router;
