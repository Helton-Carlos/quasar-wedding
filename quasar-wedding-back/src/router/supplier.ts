import { Router } from "express";
import {
  registerSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliers.controllers.js";

const router = Router();

router.post("/register", registerSupplier);
router.get("/get-all-suppliers", getAllSuppliers);
router.get("/get-supplier/:id", getSupplier);
router.put("/update-supplier/:id", updateSupplier);
router.delete("/delete-supplier/:id", deleteSupplier);

export default router;
