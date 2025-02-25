import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to login
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/login/", { username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch habits (protected route)
export const getHabits = async (token) => {
  try {
    const response = await api.get("/habits/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch habits:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
