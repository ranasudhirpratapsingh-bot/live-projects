function RoleSelector({ role, onChangeRole }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="card-title">Choose your access level</h3>
        <p className="text-muted">Select whether you want to use the public website or access the admin panel.</p>
        <div className="btn-group" role="group" aria-label="Role selector">
          <button
            type="button"
            className={`btn ${role === "user" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => onChangeRole("user")}
          >
            Public User
          </button>
          <button
            type="button"
            className={`btn ${role === "admin" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => onChangeRole("admin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;
