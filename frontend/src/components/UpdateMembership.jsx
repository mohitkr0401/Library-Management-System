import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateMembership = () => {
  const [membershipId, setMembershipId] = useState("");
  const [membership, setMembership] = useState(null);
  const [duration, setDuration] = useState("six-months");
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch membership details
  useEffect(() => {
    if (membershipId) {
      axios.get(`http://localhost:5000/memberships/${membershipId}`)
        .then((res) => setMembership(res.data))
        .catch(() => setError("Membership not found"));
    }
  }, [membershipId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/memberships/${membershipId}`,
        { duration, remove },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      navigate("/maintenance");
    } catch (err) {
      setError("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Membership</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Membership ID</label>
          <input
            type="text"
            className="form-control"
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
            required
          />
        </div>

        {membership && (
          <>
            <div className="mb-3">
              <label>Current End Date</label>
              <input
                type="text"
                className="form-control"
                value={new Date(membership.endDate).toLocaleDateString()}
                disabled
              />
            </div>

            <div className="mb-3">
              <label>New Duration</label>
              <div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="six-months"
                    checked={duration === "six-months"}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <label className="form-check-label">6 Months</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="one-year"
                    checked={duration === "one-year"}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <label className="form-check-label">1 Year</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="two-years"
                    checked={duration === "two-years"}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <label className="form-check-label">2 Years</label>
                </div>
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={remove}
                onChange={(e) => setRemove(e.target.checked)}
              />
              <label className="form-check-label">Cancel Membership</label>
            </div>
          </>
        )}

        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMembership;