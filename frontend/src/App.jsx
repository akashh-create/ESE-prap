import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CandidateForm from "./components/CandidateForm.jsx";
import CandidateList from "./components/CandidateList.jsx";
import JobForm from "./components/JobForm.jsx";
import Results from "./components/Results.jsx";
import { api } from "./services/api.js";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingCandidate, setIsSavingCandidate] = useState(false);
  const [isSavingShortlist, setIsSavingShortlist] = useState(false);

  const candidateCount = useMemo(() => candidates.length, [candidates]);
  const topScore = useMemo(
    () => (results.length ? results[0].fitScore || results[0].matchPercentage : 0),
    [results]
  );

  async function loadCandidates(value = search) {
    const data = await api.getCandidates(value);
    setCandidates(data);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadCandidates(search).catch((error) => setStatus(error.message));
    }, 250);

    return () => clearTimeout(timeout);
  }, [search]);

  async function addCandidate(candidate) {
    setIsSavingCandidate(true);
    setStatus("");
    try {
      await api.addCandidate(candidate);
      await loadCandidates("");
      setSearch("");
      setStatus("Candidate added successfully.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSavingCandidate(false);
    }
  }

  async function runMatch(job) {
    setIsLoading(true);
    setStatus("");
    setSummary("");
    try {
      const data = await api.matchCandidates(job);
      setCurrentJob(data.job);
      setResults(data.candidates);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function runAiMatch(job) {
    setIsLoading(true);
    setStatus("");
    try {
      const data = await api.aiShortlist(job);
      setCurrentJob(data.job);
      setResults(data.candidates);
      setSummary(data.summary || "");
      if (!data.aiAvailable) {
        setStatus("OpenRouter is not configured, so basic ranking was used.");
      }
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveShortlist() {
    if (!currentJob || results.length === 0) {
      setStatus("Run a match before saving a shortlist.");
      return;
    }

    setIsSavingShortlist(true);
    try {
      await api.saveShortlist({ job: currentJob, candidates: results.slice(0, 5) });
      setStatus("Shortlist saved.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSavingShortlist(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <div className="brand-line">
            <BriefcaseBusiness size={24} />
            <span>Talent Match</span>
          </div>
          <h1>Candidate Shortlisting System</h1>
        </div>
        <div className="metric-strip">
          <div>
            <span>Candidates</span>
            <strong>{candidateCount}</strong>
          </div>
          <div>
            <span>Top Match</span>
            <strong>{topScore}%</strong>
          </div>
        </div>
      </header>

      {status && <div className="status-banner">{status}</div>}

      <div className="workspace-grid">
        <div className="left-column">
          <CandidateForm onSubmit={addCandidate} isSaving={isSavingCandidate} />
          <CandidateList candidates={candidates} search={search} onSearch={setSearch} />
        </div>
        <div className="right-column">
          <JobForm onMatch={runMatch} onAiMatch={runAiMatch} isLoading={isLoading} />
          <Results
            results={results}
            summary={summary}
            onSave={saveShortlist}
            isSaving={isSavingShortlist}
          />
        </div>
      </div>
    </main>
  );
}
