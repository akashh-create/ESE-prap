import { Save, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  department: "Development",
  skills: "",
  performanceScore: "",
  experience: ""
};

export default function EmployeeForm({ editingEmployee, onCancelEdit, onSubmit, isSaving }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!editingEmployee) {
      setForm(initialForm);
      return;
    }

    setForm({
      name: editingEmployee.name,
      email: editingEmployee.email,
      department: editingEmployee.department,
      skills: editingEmployee.skills.join(", "),
      performanceScore: editingEmployee.performanceScore,
      experience: editingEmployee.experience
    });
  }, [editingEmployee]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    await onSubmit({
      ...form,
      skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      performanceScore: Number(form.performanceScore),
      experience: Number(form.experience)
    });
    if (!editingEmployee) setForm(initialForm);
  }

  return (
    <section className="panel">
      <div className="section-title">
        <UserRoundPlus size={20} />
        <h2>{editingEmployee ? "Update Employee" : "Employee Registration"}</h2>
      </div>
      <form className="form-grid" onSubmit={submit}>
        <label>
          Employee Name
          <input name="name" value={form.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Department
          <select name="department" value={form.department} onChange={updateField} required>
            <option>Development</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Operations</option>
          </select>
        </label>
        <label>
          Years of Experience
          <input name="experience" type="number" min="0" step="0.5" value={form.experience} onChange={updateField} required />
        </label>
        <label>
          Performance Score
          <input name="performanceScore" type="number" min="0" max="100" value={form.performanceScore} onChange={updateField} required />
        </label>
        <label>
          Skills
          <input name="skills" value={form.skills} onChange={updateField} placeholder="React, Node.js, MongoDB" required />
        </label>
        <div className="action-row wide">
          {editingEmployee && (
            <button className="secondary-button" type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
          <button className="primary-button" type="submit" disabled={isSaving}>
            <Save size={18} />
            {isSaving ? "Saving..." : editingEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </section>
  );
}
