import { Filter, Search } from "lucide-react";

export default function FilterBar({ filters, onChange, onSearch, onReset }) {
  function updateField(event) {
    onChange({ ...filters, [event.target.name]: event.target.value });
  }

  return (
    <section className="panel">
      <div className="section-title">
        <Filter size={20} />
        <h2>Search & Filter</h2>
      </div>
      <div className="filter-grid">
        <input name="name" value={filters.name} onChange={updateField} placeholder="Search name" />
        <input name="department" value={filters.department} onChange={updateField} placeholder="Department" />
        <input name="skill" value={filters.skill} onChange={updateField} placeholder="Skill" />
        <input name="minScore" type="number" min="0" max="100" value={filters.minScore} onChange={updateField} placeholder="Min score" />
        <button className="primary-button" type="button" onClick={onSearch}>
          <Search size={18} />
          Search
        </button>
        <button className="secondary-button" type="button" onClick={onReset}>
          Reset
        </button>
      </div>
    </section>
  );
}
