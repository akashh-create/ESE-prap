import { Edit, Trash2, UsersRound } from "lucide-react";

export default function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <section className="panel">
      <div className="section-title">
        <UsersRound size={20} />
        <h2>Employee List</h2>
      </div>
      <div className="employee-list">
        {employees.map((employee) => (
          <article className="employee-card" key={employee._id}>
            <div className="employee-main">
              <div>
                <h3>{employee.name}</h3>
                <p>{employee.email}</p>
              </div>
              <div className="score-badge">{employee.performanceScore}</div>
            </div>
            <div className="meta-row">
              <span>{employee.department}</span>
              <span>{employee.experience} yrs</span>
            </div>
            <div className="chips">
              {employee.skills.map((skill) => (
                <span key={`${employee._id}-${skill}`}>{skill}</span>
              ))}
            </div>
            <div className="card-actions">
              <button className="icon-button" type="button" onClick={() => onEdit(employee)}>
                <Edit size={16} />
                Edit
              </button>
              <button className="danger-button" type="button" onClick={() => onDelete(employee._id)}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </article>
        ))}
        {employees.length === 0 && <p className="empty-state">No employees found.</p>}
      </div>
    </section>
  );
}
