import { Brain, SearchCheck } from "lucide-react";
import { useState } from "react";

const initialJob = {
  requiredSkills: "React, Node.js",
  preferredSkills: "MongoDB, AWS",
  minExperience: 1
};

export default function JobForm({ onMatch, onAiMatch, isLoading }) {
  const [job, setJob] = useState(initialJob);

  function updateField(event) {
    setJob((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function buildJob() {
    return {
      requiredSkills: job.requiredSkills.split(",").map((skill) => skill.trim()).filter(Boolean),
      preferredSkills: job.preferredSkills.split(",").map((skill) => skill.trim()).filter(Boolean),
      minExperience: Number(job.minExperience)
    };
  }

  function handleBasic(event) {
    event.preventDefault();
    onMatch(buildJob());
  }

  function handleAi() {
    onAiMatch(buildJob());
  }

  return (
    <section className="panel">
      <div className="section-title">
        <SearchCheck size={20} />
        <h2>Job Requirement</h2>
      </div>
      <form className="form-grid" onSubmit={handleBasic}>
        <label className="wide">
          Required Skills
          <input name="requiredSkills" value={job.requiredSkills} onChange={updateField} required />
        </label>
        <label>
          Preferred Skills
          <input name="preferredSkills" value={job.preferredSkills} onChange={updateField} />
        </label>
        <label>
          Minimum Experience
          <input
            name="minExperience"
            type="number"
            min="0"
            step="0.5"
            value={job.minExperience}
            onChange={updateField}
            required
          />
        </label>
        <div className="action-row wide">
          <button className="secondary-button" type="submit" disabled={isLoading}>
            <SearchCheck size={18} />
            Basic Match
          </button>
          <button className="primary-button" type="button" onClick={handleAi} disabled={isLoading}>
            <Brain size={18} />
            AI Shortlist
          </button>
        </div>
      </form>
    </section>
  );
}
