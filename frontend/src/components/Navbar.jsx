import { FaRobot } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaRobot />
        <h2>AI LeadGen</h2>
      </div>

      <div className="nav-links">
        <a href="#">Dashboard</a>
        <a href="#">Analytics</a>
        <a href="#">Export</a>
      </div>
    </nav>
  );
}

export default Navbar;