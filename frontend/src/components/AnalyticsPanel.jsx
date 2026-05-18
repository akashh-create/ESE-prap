import { BarChart3, Brain } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function AnalyticsPanel({ employees, recommendations, summary, onRecommend, isLoading }) {
  const chartData = employees.slice(0, 8).map((employee) => ({
    name: employee.name.split(" ")[0],
    score: employee.performanceScore
  }));

  return (
    <section className="panel analytics-panel">
      <div className="results-topbar">
        <div className="section-title no-margin">
          <BarChart3 size={20} />
          <h2>Analytics & Rankings</h2>
        </div>
        <button className="primary-button" type="button" onClick={onRecommend} disabled={isLoading}>
          <Brain size={18} />
          {isLoading ? "Analyzing..." : "AI Recommend"}
        </button>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#2f7d68" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {summary && <p className="ai-summary">{summary}</p>}

      <div className="recommendation-list">
        {recommendations.map((employee, index) => (
          <article className="recommendation-card" key={employee._id}>
            <div className="result-rank">{employee.aiRank || index + 1}</div>
            <div>
              <div className="result-heading">
                <div>
                  <h3>{employee.name}</h3>
                  <p>{employee.department} | Score {employee.performanceScore} | {employee.experience} yrs</p>
                </div>
                <span className={`readiness ${String(employee.promotionReadiness).toLowerCase().replace(" ", "-")}`}>
                  {employee.promotionReadiness}
                </span>
              </div>
              <p className="recommendation">{employee.recommendation}</p>
              {employee.trainingSuggestions?.length > 0 && (
                <div className="chips">
                  {employee.trainingSuggestions.map((item) => (
                    <span key={`${employee._id}-${item}`}>{item}</span>
                  ))}
                </div>
              )}
              {employee.feedback && <p className="feedback">{employee.feedback}</p>}
            </div>
          </article>
        ))}
        {recommendations.length === 0 && <p className="empty-state">Generate AI recommendations to view promotion and training guidance.</p>}
      </div>
    </section>
  );
}
