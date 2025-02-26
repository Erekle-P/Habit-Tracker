import "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  
  // Check if user is authenticated based on localStorage token
  const isAuthenticated = !!localStorage.getItem("accessToken");

  // Logout handler clears tokens and navigates to login page
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        await logoutUser(refreshToken);
      } catch (err) {
        console.error("Logout error:", err);
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // Toggle theme: adds/removes 'dark' class on <body>
  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      {/* Updated branding */}
      <h1 className="text-xl font-bold">Habit Tracker 📋</h1>
      <ul className="flex gap-4">
        {isAuthenticated ? (
          <>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/kanban">Kanban</Link></li>
            <li><Link to="/chat">AI Chat</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li>
              <button 
                onClick={handleLogout} 
                className="bg-white text-blue-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
        {/* Theme toggle button with emoji */}
        <li>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle bg-white text-blue-600 px-3 py-1 rounded"
          >
            🌙/☀️
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
