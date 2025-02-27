
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import NotificationBar from "./NotificationBar";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

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

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <NotificationBar />
      <nav className="flex justify-between items-center p-4 bg-accent-blue text-white">
        <h1 className="text-xl font-bold">Habit Tracker 📋</h1>
        <ul className="flex gap-4 flex-wrap">
          {isAuthenticated ? (
            <>
              <li><Link to="/">Dashboard 🏠︎</Link></li>
              <li><Link to="/habits">Habits 🎯</Link></li>
              <li><Link to="/notes">Notes 📝</Link></li>
              <li><Link to="/calendar">Calendar 🗓️</Link></li>
              <li><Link to="/kanban">Kanban 📌</Link></li>
              <li><Link to="/chat">AI Chat 🤖</Link></li>
              <li><Link to="/settings">Settings ⚙️</Link></li>
              <li>
                <button onClick={handleLogout} className="bg-white text-accent-blue px-3 py-1 rounded">
                  Logout 🔓
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
          <li>
            <button onClick={toggleTheme} className="theme-toggle bg-white text-accent-blue px-3 py-1 rounded">
              🌙/☀️
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
