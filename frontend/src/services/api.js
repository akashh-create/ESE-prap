const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
  signup: (payload) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getEmployees: () => request("/employees"),
  searchEmployees: (params) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, value]) => value !== "" && value !== null)
    ).toString();
    return request(`/employees/search${query ? `?${query}` : ""}`);
  },
  addEmployee: (employee) =>
    request("/employees", {
      method: "POST",
      body: JSON.stringify(employee)
    }),
  updateEmployee: (id, employee) =>
    request(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(employee)
    }),
  deleteEmployee: (id) =>
    request(`/employees/${id}`, {
      method: "DELETE"
    }),
  getRecommendations: () =>
    request("/ai/recommend", {
      method: "POST",
      body: JSON.stringify({})
    })
};
