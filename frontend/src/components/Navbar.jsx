import { FaRobot } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
function Navbar({darkMode, setDarkMode}) {
  return (
    <nav className="navbar">

      <div className="logo">
        <FaRobot className="logo-icon" />
        <h2>AI LeadGen</h2>
      </div>

      <div className="nav-links">
        <a href="#">
          <MdOutlineDashboard />
          Dashboard
        </a>

        <a href="#">
          <FiBarChart2 />
          Analytics
        </a>

        <a href="#">
          <BsDownload />
          Export
        </a>
        </div>
        <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
        >
        {   darkMode ? <FaSun /> : <FaMoon />}
        </button>

    </nav>
  );
}

export default Navbar;