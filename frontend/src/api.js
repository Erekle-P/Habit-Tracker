import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// AUTH
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
  return data; // { message: "..."}
};

// HABITS
export const getHabits = async (accessToken) => {
  const { data } = await api.get("/habits/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const createHabit = async (habit, accessToken) => {
  const { data } = await api.post("/habits/", habit, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const updateHabit = async (habitId, updates, accessToken) => {
  const { data } = await api.patch(`/habits/${habitId}/`, updates, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

// TASKS
export const getTasks = async (accessToken) => {
  const { data } = await api.get("/tasks/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const createTask = async (task, accessToken) => {
  const { data } = await api.post("/tasks/", task, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

export const updateTask = async (taskId, updates, accessToken) => {
  const { data } = await api.patch(`/tasks/${taskId}/`, updates, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

// AI
export const chatWithAI = async (prompt, accessToken) => {
  const { data } = await api.post("/chat/", { prompt }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data; // { response: "..." }
};

export const sortAll = async (accessToken) => {
  // merges habits & tasks in the backend, returns a sorted list
  const { data } = await api.post("/ai-sort/", {}, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data; // { sorted: [ ... ] }
};

export default api;
