import { Router } from "express";
import { shortlistCandidates } from "../controllers/matchController.js";

const router = Router();

router.post("/", shortlistCandidates);

export default router;
