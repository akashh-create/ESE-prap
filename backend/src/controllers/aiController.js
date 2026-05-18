import Employee from "../models/Employee.js";
import { getEmployeeRecommendations } from "../services/openRouterService.js";

function basicRecommendation(employee) {
  const missingCoreSkills = ["Leadership", "Communication", "Cloud", "Data Analysis"].filter(
    (skill) => !employee.skills.some((employeeSkill) => employeeSkill.toLowerCase() === skill.toLowerCase())
  );

  let recommendation = "Focus on structured training and measurable quarterly goals.";

  if (employee.performanceScore >= 85 && employee.experience >= 3) {
    recommendation = "Strong promotion-ready employee with consistent performance and sufficient experience.";
  } else if (employee.performanceScore < 60) {
    recommendation = "Needs improvement plan, mentoring, and skill enhancement support.";
  } else if (missingCoreSkills.length) {
    recommendation = `Recommended training areas: ${missingCoreSkills.slice(0, 2).join(", ")}.`;
  }

  return {
    employeeId: String(employee._id),
    aiRank: 0,
    recommendation,
    trainingSuggestions: missingCoreSkills.slice(0, 3),
    promotionReadiness:
      employee.performanceScore >= 85 && employee.experience >= 3 ? "High" : "Needs Review",
    feedback: recommendation
  };
}

export async function recommendEmployees(req, res, next) {
  try {
    const employees = await Employee.find().sort({ performanceScore: -1, experience: -1 });
    const aiResult = await getEmployeeRecommendations({ employees });

    const rankingMap = new Map(
      (aiResult.rankings || []).map((item) => [
        String(item.employeeId),
        item
      ])
    );

    const merged = employees
      .map((item) => {
        const employee = item.toObject();
        const aiEmployee = rankingMap.get(String(employee._id)) || basicRecommendation(employee);
        return {
          ...employee,
          aiRank: aiEmployee.aiRank,
          recommendation: aiEmployee.recommendation,
          trainingSuggestions: aiEmployee.trainingSuggestions || [],
          promotionReadiness: aiEmployee.promotionReadiness || "Needs Review",
          feedback: aiEmployee.feedback || aiEmployee.recommendation
        };
      })
      .sort((a, b) => {
        if (a.aiRank && b.aiRank) return a.aiRank - b.aiRank;
        if (a.aiRank) return -1;
        if (b.aiRank) return 1;
        return b.performanceScore - a.performanceScore;
      });

    res.json({
      aiAvailable: aiResult.aiAvailable !== false,
      summary: aiResult.summary,
      employees: merged
    });
  } catch (error) {
    next(error);
  }
}
