import { Router } from "express";
import { recommendEmployees } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/recommend", protect, recommendEmployees);

export default router;
