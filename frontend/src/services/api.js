const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  getCandidates: (search = "") =>
    request(`/candidates${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  addCandidate: (candidate) =>
    request("/candidates", {
      method: "POST",
      body: JSON.stringify(candidate)
    }),
  matchCandidates: (job) =>
    request("/match", {
      method: "POST",
      body: JSON.stringify(job)
    }),
  aiShortlist: (job) =>
    request("/ai/shortlist", {
      method: "POST",
      body: JSON.stringify(job)
    }),
  saveShortlist: (payload) =>
    request("/shortlists", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
