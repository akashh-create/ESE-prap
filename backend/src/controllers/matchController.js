import Candidate from "../models/Candidate.js";
import SavedShortlist from "../models/SavedShortlist.js";
import { matchCandidates } from "../services/matchService.js";

export async function shortlistCandidates(req, res, next) {
  try {
    const candidates = await Candidate.find();
    const results = matchCandidates(candidates, req.body);
    res.json({ job: req.body, candidates: results });
  } catch (error) {
    next(error);
  }
}

export async function saveShortlist(req, res, next) {
  try {
    const { job, candidates } = req.body;

    if (!job || !Array.isArray(candidates) || candidates.length === 0) {
      return res.status(400).json({ message: "Job and candidates are required" });
    }

    const saved = await SavedShortlist.create({
      job,
      candidates: candidates.map((candidate) => ({
        candidate: candidate._id,
        matchScore: candidate.matchScore,
        matchedSkills: candidate.matchedSkills,
        rank: candidate.rank,
        aiRecommendation: candidate.aiRecommendation
      }))
    });

    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
}

export async function getSavedShortlists(_req, res, next) {
  try {
    const saved = await SavedShortlist.find()
      .populate("candidates.candidate")
      .sort({ createdAt: -1 });
    res.json(saved);
  } catch (error) {
    next(error);
  }
}
