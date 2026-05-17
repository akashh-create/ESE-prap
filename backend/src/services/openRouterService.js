export async function getAiShortlist({ job, candidates }) {
  if (!process.env.OPENROUTER_API_KEY) {
    return {
      aiAvailable: false,
      recommendation:
        "OpenRouter API key is not configured. Basic matching results are shown instead.",
      candidates: candidates.map((candidate, index) => ({
        candidateId: String(candidate._id),
        aiRank: index + 1,
        aiRecommendation: "Ranked using skill overlap and experience criteria."
      }))
    };
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-5.2";
  const compactCandidates = candidates.slice(0, 20).map((candidate, index) => ({
    index: index + 1,
    id: String(candidate._id),
    name: candidate.name,
    skills: candidate.skills,
    experience: candidate.experience,
    bio: candidate.bio,
    projects: candidate.projects,
    basicMatchPercentage: candidate.matchPercentage,
    matchedSkills: candidate.matchedSkills
  }));

  const prompt = `
You are helping a recruiter shortlist candidates.
Return only valid JSON with this shape:
{
  "summary": "brief overall recommendation",
  "rankings": [
    {
      "candidateId": "candidate id",
      "aiRank": 1,
      "fitScore": 92,
      "recommendation": "2-3 sentence explanation",
      "interviewQuestions": ["question 1", "question 2", "question 3"]
    }
  ]
}

Job:
Required skills: ${job.requiredSkills.join(", ")}
Preferred skills: ${(job.preferredSkills || []).join(", ") || "None"}
Minimum experience: ${job.minExperience} years

Candidates:
${JSON.stringify(compactCandidates, null, 2)}
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
      "X-Title": "Candidate Shortlisting System"
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenRouter request failed: ${message}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenRouter response did not include content");
  }

  return {
    aiAvailable: true,
    ...JSON.parse(content)
  };
}
