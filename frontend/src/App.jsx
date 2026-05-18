import { LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AnalyticsPanel from "./components/AnalyticsPanel.jsx";
import AuthPanel from "./components/AuthPanel.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import FilterBar from "./components/FilterBar.jsx";
import { api } from "./services/api.js";

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [employees, setEmployees] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState("");
  const [filters, setFilters] = useState({ name: "", department: "", skill: "", minScore: "" });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingEmployee, setIsSavingEmployee] = useState(false);

  const averageScore = useMemo(() => {
    if (!employees.length) return 0;
    return Math.round(employees.reduce((total, employee) => total + employee.performanceScore, 0) / employees.length);
  }, [employees]);

  const topEmployee = useMemo(() => employees[0]?.name || "None", [employees]);

  async function loadEmployees() {
    const data = await api.getEmployees();
    setEmployees(data);
  }

  useEffect(() => {
    if (user) {
      loadEmployees().catch((error) => setStatus(error.message));
    }
  }, [user]);

  async function handleAuth(mode, payload) {
    setStatus("");
    setIsLoading(true);
    try {
      const data = mode === "login" ? await api.login(payload) : await api.signup(payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setStatus("");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setEmployees([]);
    setRecommendations([]);
  }

  async function saveEmployee(employee) {
    setIsSavingEmployee(true);
    setStatus("");
    try {
      if (editingEmployee) {
        await api.updateEmployee(editingEmployee._id, employee);
        setStatus("Employee updated successfully.");
      } else {
        await api.addEmployee(employee);
        setStatus("Employee stored successfully.");
      }
      setEditingEmployee(null);
      await loadEmployees();
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSavingEmployee(false);
    }
  }

  async function deleteEmployee(id) {
    setStatus("");
    try {
      await api.deleteEmployee(id);
      setStatus("Employee removed successfully.");
      await loadEmployees();
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function searchEmployees() {
    setStatus("");
    try {
      const data = await api.searchEmployees(filters);
      setEmployees(data);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function resetFilters() {
    setFilters({ name: "", department: "", skill: "", minScore: "" });
    await loadEmployees();
  }

  async function getRecommendations() {
    setIsLoading(true);
    setStatus("");
    try {
      const data = await api.getRecommendations();
      setRecommendations(data.employees);
      setSummary(data.summary || "");
      if (!data.aiAvailable) {
        setStatus("OpenRouter is not configured, so rule-based recommendations were used.");
      }
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return <AuthPanel onAuth={handleAuth} status={status} />;
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <div className="brand-line">
            <ShieldCheck size={24} />
            <span>HR Performance AI</span>
          </div>
          <h1>Employee Performance Analytics</h1>
        </div>
        <div className="metric-strip">
          <div>
            <span>Employees</span>
            <strong>{employees.length}</strong>
          </div>
          <div>
            <span>Average Score</span>
            <strong>{averageScore}</strong>
          </div>
          <div>
            <span>Top Performer</span>
            <strong className="small-metric">{topEmployee}</strong>
          </div>
        </div>
      </header>

      <div className="user-bar">
        <span>{user.name} | {user.role}</span>
        <button className="icon-button" type="button" onClick={logout}>
          <LogOut size={17} />
          Logout
        </button>
      </div>

      {status && <div className="status-banner">{status}</div>}

      <div className="workspace-grid">
        <div className="left-column">
          <EmployeeForm
            editingEmployee={editingEmployee}
            onCancelEdit={() => setEditingEmployee(null)}
            onSubmit={saveEmployee}
            isSaving={isSavingEmployee}
          />
          <FilterBar
            filters={filters}
            onChange={setFilters}
            onSearch={searchEmployees}
            onReset={resetFilters}
          />
          <EmployeeList employees={employees} onEdit={setEditingEmployee} onDelete={deleteEmployee} />
        </div>
        <div className="right-column">
          <AnalyticsPanel
            employees={employees}
            recommendations={recommendations}
            summary={summary}
            onRecommend={getRecommendations}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
