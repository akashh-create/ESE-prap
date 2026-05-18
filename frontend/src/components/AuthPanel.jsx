import { LockKeyhole, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";

export default function AuthPanel({ onAuth, status }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "HR Admin",
    email: "admin@example.com",
    password: "password123",
    role: "Admin"
  });

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    onAuth(mode, form);
  }

  return (
    <main className="auth-screen">
      <section className="auth-panel">
        <div className="brand-line">
          <LockKeyhole size={24} />
          <span>HR Performance AI</span>
        </div>
        <h1>Employee Performance Analytics</h1>
        <div className="mode-switch">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} type="button">
            <LogIn size={17} />
            Login
          </button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">
            <UserPlus size={17} />
            Signup
          </button>
        </div>
        <form className="form-grid single" onSubmit={submit}>
          {mode === "signup" && (
            <label>
              Name
              <input name="name" value={form.name} onChange={updateField} required />
            </label>
          )}
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} required />
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={updateField} required />
          </label>
          {mode === "signup" && (
            <label>
              Role
              <select name="role" value={form.role} onChange={updateField}>
                <option>Admin</option>
                <option>HR</option>
              </select>
            </label>
          )}
          <button className="primary-button" type="submit">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
        {status && <p className="status-banner compact">{status}</p>}
      </section>
    </main>
  );
}
