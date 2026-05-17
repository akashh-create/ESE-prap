import { Router } from "express";
import { addCandidate, getCandidates } from "../controllers/candidateController.js";

const router = Router();

router.post("/", addCandidate);
router.get("/", getCandidates);

export default router;
