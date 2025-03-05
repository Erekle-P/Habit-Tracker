import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add an interceptor to log unauthorized responses (status code 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Received 401 Unauthorized response from API");
      // Optionally, you could add logic here to refresh the token or redirect to login.
    }
    return Promise.reject(error);
  }
);

// Helper to ensure that an access token is provided for protected calls.
const ensureToken = (accessToken) => {
  if (!accessToken) {
    throw new Error("Missing access token. Please login first.");
  }
};

// --------------------
// Authentication Endpoints
// --------------------
export const signupUser = async (username, password) => {
  const { data } = await api.post("/signup/", { username, password });
  return data;
};

export const loginUser = async (username, password) => {
  const { data } = await api.post("/login/", { username, password });
  return data; // { access, refresh }
};

export const logoutUser = async (refreshToken) => {
  const { data } = await api.post("/logout/", { refresh: refreshToken });
  return data;
};

// --------------------
// Habits Endpoints
// --------------------
export const getHabits = async (accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.get("/habits/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const createHabit = async (habit, accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.post("/habits/", habit, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const updateHabit = async (habitId, updates, accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.patch(`/habits/${habitId}/`, updates, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const deleteHabit = async (habitId, accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.delete(`/habits/${habitId}/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

// --------------------
// Tasks Endpoints
// --------------------
export const getTasks = async (accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.get("/tasks/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const createTask = async (task, accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.post("/tasks/", task, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const updateTask = async (taskId, updates, accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.patch(`/tasks/${taskId}/`, updates, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const deleteTask = async (taskId, accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.delete(`/tasks/${taskId}/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

// --------------------
// AI Endpoints
// --------------------
export const chatWithAI = async (prompt, accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.post("/chat/", { prompt }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data; // { response: "..." }
};

export const sortAll = async (accessToken) => {
  ensureToken(accessToken);
  const { data } = await api.post("/ai-sort/", {}, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data; // { sorted: [ ... ] }
};

export default api;
