import { Router } from "express";
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee
} from "../controllers/employeeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.post("/", addEmployee);
router.get("/", getEmployees);
router.get("/search", searchEmployees);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
