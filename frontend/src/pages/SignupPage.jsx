// SignupPage.jsx

import { useState } from "react";
import { signupUser, loginUser } from "../api";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create a new user account
      await signupUser(username, password);
      // Automatically log in the user after a successful signup
      const { access, refresh } = await loginUser(username, password);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      // Store the username for display purposes
      localStorage.setItem("username", username);
      alert("Signup and login successful!");
      navigate("/"); // Redirect directly to the dashboard
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Error signing up");
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl mb-4">📝 Sign Up</h2>
      <form onSubmit={handleSignup} className="flex flex-col items-center gap-2">
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
