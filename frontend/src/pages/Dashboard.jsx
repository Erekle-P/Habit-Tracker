// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { getHabits, createHabit, createTask } from "../api";
import paperImage from "../pic/paper.png";
import officeDesk from "../pic/office-desk.jpg"; // ADDED: for not-logged-in background

function Dashboard() {
  // Quick add inputs
  const [habitTitle, setHabitTitle] = useState("");
  const [habitFreq, setHabitFreq] = useState("DAILY");
  const [habitTime, setHabitTime] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  // Daily habits overview (checklist)
  const [dailyHabits, setDailyHabits] = useState([]);

  // Retrieve auth token
  const accessToken = localStorage.getItem("accessToken");

  // ADDED: local state for showing a dog GIF after creation
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    if (accessToken) {
      loadHabits();
    }
  }, [accessToken]);

  // ADDED: auto-hide the GIF after 3 seconds
  useEffect(() => {
    if (gifUrl) {
      const timer = setTimeout(() => {
        setGifUrl(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gifUrl]);

  const loadHabits = async () => {
    try {
      const habits = await getHabits(accessToken);
      // Filter habits that are daily
      const daily = habits.filter((h) => h.frequency === "DAILY");
      setDailyHabits(daily);
    } catch (err) {
      console.error("Failed to load habits:", err);
    }
  };

  const handleCreateHabit = async () => {
    try {
      const payload = {
        title: habitTitle,
        frequency: habitFreq,
        preferred_time: habitTime.trim() === "" ? null : habitTime,
      };
      await createHabit(payload, accessToken);
      alert("Habit created!");

      // ADDED: Show dog GIF
      setGifUrl("/src/pic/good-dog.gif");

      setHabitTitle("");
      setHabitTime("");
      loadHabits(); // Refresh habits list
    } catch (err) {
      console.error("Failed to create habit:", err);
    }
  };

  const handleCreateTask = async () => {
    try {
      const payload = {
        title: taskTitle,
        deadline: taskDeadline.trim() === "" ? null : taskDeadline,
      };
      await createTask(payload, accessToken);
      alert("Note created!");

      // ADDED: Show dog GIF
      setGifUrl("/src/pic/good-dog.gif");

      setTaskTitle("");
      setTaskDeadline("");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // ADDED: If user is not logged in, show office desk background + message
  if (!accessToken) {
    return (
      <div
        style={{
          backgroundImage: `url(${officeDesk})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Please login in order to see your Habits/Notes</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      // Full-page background
      style={{
        backgroundImage: `url(${paperImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>

        {/* ADDED: Show dog GIF if available */}
        {gifUrl && (
          <div className="mb-4">
            <img
              src={gifUrl}
              alt="Dog celebration"
              style={{ margin: "0 auto", maxHeight: "200px" }}
            />
          </div>
        )}

        {/* Highlighted container for Daily Habits */}
        <div
          style={{
            backgroundColor: "rgba(237, 63, 63, 0.4)",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 className="text-lg font-bold mb-2">Overview of Daily Habits 📊</h3>
          {dailyHabits.length === 0 ? (
            <p>No daily habits yet.</p>
          ) : (
            <ul className="text-left">
              {dailyHabits.map((habit) => (
                <li key={habit.id} className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>{habit.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Add Habit & Notes */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Quick Add Habit &amp; Notes ➕</h3>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Habit title"
                value={habitTitle}
                onChange={(e) => setHabitTitle(e.target.value)}
                className="p-2 border rounded w-64"
              />
              <select
                value={habitFreq}
                onChange={(e) => setHabitFreq(e.target.value)}
                className="p-2 border rounded w-64"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
              <input
                type="time"
                value={habitTime}
                onChange={(e) => setHabitTime(e.target.value)}
                className="p-2 border rounded w-64"
                placeholder="Preferred Time"
              />
              <button
                onClick={handleCreateHabit}
                className="bg-green-600 text-white px-4 py-2 rounded w-64"
              >
                Create Habit
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                placeholder="Note title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="p-2 border rounded w-64"
              />
              <input
                type="datetime-local"
                value={taskDeadline}
                onChange={(e) => setTaskDeadline(e.target.value)}
                className="p-2 border rounded w-64"
              />
              <button
                onClick={handleCreateTask}
                className="bg-blue-600 text-white px-4 py-2 rounded w-64"
              >
                Create Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
