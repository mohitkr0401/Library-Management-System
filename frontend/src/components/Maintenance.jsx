import { Link } from "react-router-dom";

const Maintenance = () => {
  return (
    <div className="container mt-4">
      <h2>Maintenance</h2>
      <div className="card">
        <div className="card-body">
          <div className="mb-4">
            <h4>Membership</h4>
            <Link to="/add-membership" className="btn btn-primary me-2">Add</Link>
            <Link to="/update-membership" className="btn btn-warning">Update</Link>
          </div>

          <div className="mb-4">
            <h4>Books/Movies</h4>
            <Link to="/add-book" className="btn btn-primary me-2">Add</Link>
            <Link to="/update-book" className="btn btn-warning">Update</Link>
          </div>

          <div>
            <h4>User Management</h4>
            <Link to="/add-user" className="btn btn-primary me-2">Add</Link>
            <Link to="/update-user" className="btn btn-warning">Update</Link>
          </div>

          <Link to="/admin-dashboard" className="btn btn-secondary mt-4">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;