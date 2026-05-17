import { Router } from "express";
import { getSavedShortlists, saveShortlist } from "../controllers/matchController.js";

const router = Router();

router.post("/", saveShortlist);
router.get("/", getSavedShortlists);

export default router;
