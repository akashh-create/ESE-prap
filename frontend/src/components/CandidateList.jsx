import { Search } from "lucide-react";

export default function CandidateList({ candidates, search, onSearch }) {
  return (
    <section className="panel">
      <div className="list-header">
        <div className="section-title">
          <Search size={20} />
          <h2>Candidates</h2>
        </div>
        <input
          className="search-input"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search candidates"
        />
      </div>
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <article className="candidate-item" key={candidate._id}>
            <div>
              <h3>{candidate.name}</h3>
              <p>{candidate.email}</p>
            </div>
            <strong>{candidate.experience} yrs</strong>
            <div className="chips">
              {candidate.skills.map((skill) => (
                <span key={`${candidate._id}-${skill}`}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
        {candidates.length === 0 && <p className="empty-state">No candidates found.</p>}
      </div>
    </section>
  );
}
