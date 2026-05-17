import { normalizeSkill, normalizeSkillList } from "../utils/normalize.js";

function rankFromScore(matchScore, experienceMatch) {
  if (matchScore >= 0.8 && experienceMatch) return "High";
  if (matchScore >= 0.5 || experienceMatch) return "Medium";
  return "Low";
}

export function matchCandidates(candidates, job) {
  const requiredSkills = normalizeSkillList(job.requiredSkills);
  const preferredSkills = normalizeSkillList(job.preferredSkills);
  const minExperience = Number(job.minExperience || 0);

  if (!requiredSkills.length) {
    const error = new Error("At least one required skill is needed");
    error.statusCode = 400;
    throw error;
  }

  return candidates
    .map((candidate) => {
      const candidateSkillMap = new Map(
        candidate.skills.map((skill) => [normalizeSkill(skill), skill])
      );

      const matchedSkills = requiredSkills
        .filter((skill) => candidateSkillMap.has(skill))
        .map((skill) => candidateSkillMap.get(skill));
      const preferredMatchedSkills = preferredSkills
        .filter((skill) => candidateSkillMap.has(skill))
        .map((skill) => candidateSkillMap.get(skill));

      const requiredScore = matchedSkills.length / requiredSkills.length;
      const preferredBoost = preferredSkills.length
        ? (preferredMatchedSkills.length / preferredSkills.length) * 0.15
        : 0;
      const experienceMatch = candidate.experience >= minExperience;
      const experiencePenalty = experienceMatch ? 0 : 0.2;
      const matchScore = Math.max(0, Math.min(1, requiredScore + preferredBoost - experiencePenalty));

      return {
        ...candidate.toObject(),
        matchedSkills,
        preferredMatchedSkills,
        matchScore,
        matchPercentage: Math.round(matchScore * 100),
        experienceMatch,
        rank: rankFromScore(matchScore, experienceMatch)
      };
    })
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return b.experience - a.experience;
    });
}
