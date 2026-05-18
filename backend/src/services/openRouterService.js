export async function getEmployeeRecommendations({ employees }) {
  if (!process.env.OPENROUTER_API_KEY) {
    return {
      aiAvailable: false,
      summary:
        "OpenRouter API key is not configured. Rule-based recommendations are shown instead.",
      rankings: employees.map((employee, index) => ({
        employeeId: String(employee._id),
        aiRank: index + 1,
        recommendation: "Ranked using performance score, experience, and available skills.",
        trainingSuggestions: [],
        promotionReadiness: employee.performanceScore >= 85 ? "High" : "Needs Review",
        feedback: "Rule-based feedback generated because AI is not configured."
      }))
    };
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-5.2";
  const compactEmployees = employees.slice(0, 30).map((employee, index) => ({
    index: index + 1,
    id: String(employee._id),
    name: employee.name,
    email: employee.email,
    department: employee.department,
    skills: employee.skills,
    performanceScore: employee.performanceScore,
    experience: employee.experience
  }));

  const prompt = `
You are an HR analytics assistant.
Return only valid JSON with this shape:
{
  "summary": "brief overall workforce recommendation",
  "rankings": [
    {
      "employeeId": "employee id",
      "aiRank": 1,
      "recommendation": "2-3 sentence promotion or improvement recommendation",
      "trainingSuggestions": ["training area 1", "training area 2"],
      "promotionReadiness": "High | Medium | Low",
      "feedback": "direct HR feedback"
    }
  ]
}

Rank employees for promotion readiness and recommend training. Consider performance score, years of experience, department, and skills.

Employees:
${JSON.stringify(compactEmployees, null, 2)}
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
      "X-Title": "Employee Performance Analytics"
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
