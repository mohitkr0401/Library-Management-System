import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Maintenance from "./components/Maintenance";
import AddMembership from "./components/AddMembership";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/add-membership" element={<AddMembership />} />
        {/* Add UserDashboard later */}
      </Routes>
    </Router>
  );
}

export default App;
