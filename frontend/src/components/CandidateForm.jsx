import { Plus, UserRound } from "lucide-react";
import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  skills: "",
  experience: "",
  bio: "",
  projects: ""
};

export default function CandidateForm({ onSubmit, isSaving }) {
  const [form, setForm] = useState(initialForm);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({
      ...form,
      skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      experience: Number(form.experience)
    });
    setForm(initialForm);
  }

  return (
    <section className="panel">
      <div className="section-title">
        <UserRound size={20} />
        <h2>Add Candidate</h2>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={updateField} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Skills
          <input
            name="skills"
            value={form.skills}
            onChange={updateField}
            placeholder="React, Node.js, MongoDB"
            required
          />
        </label>
        <label>
          Experience
          <input
            name="experience"
            type="number"
            min="0"
            step="0.5"
            value={form.experience}
            onChange={updateField}
            required
          />
        </label>
        <label className="wide">
          Projects
          <textarea name="projects" value={form.projects} onChange={updateField} rows="2" />
        </label>
        <label className="wide">
          Bio
          <textarea name="bio" value={form.bio} onChange={updateField} rows="3" />
        </label>
        <button className="primary-button wide" type="submit" disabled={isSaving}>
          <Plus size={18} />
          {isSaving ? "Adding..." : "Add Candidate"}
        </button>
      </form>
    </section>
  );
}
