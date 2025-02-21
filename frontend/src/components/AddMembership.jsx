import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMembership = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    duration: "six-months" // Default as per Excel
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/memberships",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      navigate("/maintenance");
    } catch (err) {
      setError("Failed to add membership");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Membership</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Membership Duration</label>
          <div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="six-months"
                checked={formData.duration === "six-months"}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
              <label className="form-check-label">6 Months</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="one-year"
                checked={formData.duration === "one-year"}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              <label className="form-check-label">1 Year</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="two-years"
                checked={formData.duration === "two-years"}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              <label className="form-check-label">2 Years</label>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddMembership;