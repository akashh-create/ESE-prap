import Candidate from "../models/Candidate.js";
import { matchCandidates } from "../services/matchService.js";
import { getAiShortlist } from "../services/openRouterService.js";

export async function aiShortlistCandidates(req, res, next) {
  try {
    const candidates = await Candidate.find();
    const basicResults = matchCandidates(candidates, req.body);
    const aiResult = await getAiShortlist({ job: req.body, candidates: basicResults });

    const rankingMap = new Map(
      (aiResult.rankings || aiResult.candidates || []).map((item) => [
        String(item.candidateId),
        item
      ])
    );

    const merged = basicResults
      .map((candidate) => {
        const aiCandidate = rankingMap.get(String(candidate._id));
        return {
          ...candidate,
          aiRank: aiCandidate?.aiRank,
          fitScore: aiCandidate?.fitScore,
          aiRecommendation:
            aiCandidate?.recommendation ||
            aiCandidate?.aiRecommendation ||
            "AI did not return a specific explanation for this candidate.",
          interviewQuestions: aiCandidate?.interviewQuestions || []
        };
      })
      .sort((a, b) => {
        if (a.aiRank && b.aiRank) return a.aiRank - b.aiRank;
        if (a.aiRank) return -1;
        if (b.aiRank) return 1;
        return b.matchScore - a.matchScore;
      });

    res.json({
      job: req.body,
      aiAvailable: aiResult.aiAvailable !== false,
      summary: aiResult.summary || aiResult.recommendation,
      candidates: merged
    });
  } catch (error) {
    next(error);
  }
}
