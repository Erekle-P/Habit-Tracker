// LoginPage.jsx

import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access, refresh } = await loginUser(username, password);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // ADDED: Store the username in localStorage
      localStorage.setItem("username", username);

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl mb-4">🔐 Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
        <input
          type="text"
          placeholder="Username"
          className="p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
