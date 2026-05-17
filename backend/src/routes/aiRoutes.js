import { Router } from "express";
import { aiShortlistCandidates } from "../controllers/aiController.js";

const router = Router();

router.post("/shortlist", aiShortlistCandidates);

export default router;
