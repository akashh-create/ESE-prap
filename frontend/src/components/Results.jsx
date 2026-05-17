import { Save, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function Results({ results, summary, onSave, isSaving }) {
  if (!results?.length) {
    return (
      <section className="panel results-panel">
        <div className="empty-state">Run a match to see ranked candidates.</div>
      </section>
    );
  }

  const chartData = results.slice(0, 8).map((candidate) => ({
    name: candidate.name.split(" ")[0],
    score: candidate.fitScore || candidate.matchPercentage
  }));

  return (
    <section className="panel results-panel">
      <div className="results-topbar">
        <div className="section-title">
          <Sparkles size={20} />
          <h2>Shortlisted Candidates</h2>
        </div>
        <button className="icon-button" type="button" onClick={onSave} disabled={isSaving}>
          <Save size={18} />
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {summary && <p className="ai-summary">{summary}</p>}

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

      <div className="results-list">
        {results.map((candidate, index) => (
          <article className="result-card" key={candidate._id}>
            <div className="result-rank">{candidate.aiRank || index + 1}</div>
            <div className="result-body">
              <div className="result-heading">
                <div>
                  <h3>{candidate.name}</h3>
                  <p>{candidate.experience} years experience</p>
                </div>
                <div className={`rank-pill ${candidate.rank.toLowerCase()}`}>{candidate.rank}</div>
              </div>
              <div className="score-line">
                <div style={{ width: `${candidate.fitScore || candidate.matchPercentage}%` }} />
              </div>
              <p className="score-text">
                {candidate.fitScore || candidate.matchPercentage}% match
              </p>
              <div className="chips">
                {(candidate.matchedSkills || []).map((skill) => (
                  <span key={`${candidate._id}-matched-${skill}`}>{skill}</span>
                ))}
              </div>
              {candidate.aiRecommendation && (
                <p className="recommendation">{candidate.aiRecommendation}</p>
              )}
              {candidate.interviewQuestions?.length > 0 && (
                <div className="questions">
                  {candidate.interviewQuestions.map((question) => (
                    <p key={question}>{question}</p>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
