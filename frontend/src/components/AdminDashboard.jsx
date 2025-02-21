import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]); // For displaying books (we'll implement later)

  // Check if user is authenticated as admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <Link to="/maintenance" className="btn btn-secondary me-2">Maintenance</Link>
          <Link to="/reports" className="btn btn-secondary me-2">Reports</Link>
          <Link to="/transactions" className="btn btn-secondary">Transactions</Link>
        </div>
        <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
      </div>

      {/* Product Details Table (from Excel's Admin Home Page) */}
      <div className="card">
        <div className="card-header">Product Details</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Code No From</th>
                <th>Code No To</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SC(B/M)000001</td>
                <td>SC(B/M)000004</td>
                <td>Science</td>
              </tr>
              <tr>
                <td>EC(B/M)000001</td>
                <td>EC(B/M)000004</td>
                <td>Economics</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;