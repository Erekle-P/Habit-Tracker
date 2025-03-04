// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { getHabits, createHabit, createTask } from "../api";
import paperImage from "../pic/paper.png";
import officeDesk from "../pic/office-desk.jpg";

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

  // State for showing a dog GIF after creation
  const [gifUrl, setGifUrl] = useState(null);

  // Load daily habits when logged in
  useEffect(() => {
    if (accessToken) {
      loadHabits();
    }
  }, [accessToken]);

  // Auto-hide the dog GIF after 3 seconds
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

      // Show dog GIF
      setGifUrl("/src/pic/good-dog.gif");

      // Reset fields
      setHabitTitle("");
      setHabitTime("");

      // Refresh habits
      loadHabits();
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

      // Show dog GIF
      setGifUrl("/src/pic/good-dog.gif");

      // Reset fields
      setTaskTitle("");
      setTaskDeadline("");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // If user is not logged in, show office-desk background + message
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
          <h2 className="text-2xl font-bold mb-4">
            Please login in order to see your Habits/Notes
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
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

        {/* Show dog GIF if available */}
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

          {/* A flex container with bigger gap, translucent backgrounds, neon hover glow, and centered content */}
          <div className="flex flex-row gap-16 justify-center">
            {/* Habit Form */}
            <div
              className="
                flex flex-col gap-4 items-center text-center
                p-6 w-72
                bg-white/10 backdrop-blur-md
                border border-white/40
                rounded
                shadow-md
                hover:shadow-xl
                hover:shadow-[0_0_20px_rgba(0,255,0,0.6)]
                transition-shadow duration-200
              "
            >
              <label className="font-bold">Habit title</label>
              <input
                type="text"
                placeholder="Habit title"
                value={habitTitle}
                onChange={(e) => setHabitTitle(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <label className="font-bold">Frequency</label>
              <select
                value={habitFreq}
                onChange={(e) => setHabitFreq(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
              <label className="font-bold">Time</label>
              <input
                type="time"
                value={habitTime}
                onChange={(e) => setHabitTime(e.target.value)}
                className="p-2 border rounded w-full"
                placeholder="--:-- --"
              />
              <button
                onClick={handleCreateHabit}
                className="
                  bg-green-600 text-white px-4 py-2 rounded w-full
                  hover:bg-green-700
                  hover:shadow-md
                  hover:shadow-green-400/50
                  transition-all duration-200
                "
              >
                Create Habit
              </button>
            </div>

            {/* Note Form */}
            <div
              className="
                flex flex-col gap-4 items-center text-center
                p-6 w-72
                bg-white/10 backdrop-blur-md
                border border-white/40
                rounded
                shadow-md
                hover:shadow-xl
                hover:shadow-[0_0_20px_rgba(0,255,0,0.6)]
                transition-shadow duration-200
              "
            >
              <label className="font-bold">Note title</label>
              <input
                type="text"
                placeholder="Note title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <label className="font-bold">Date/Time</label>
              <input
                type="datetime-local"
                value={taskDeadline}
                onChange={(e) => setTaskDeadline(e.target.value)}
                className="p-2 border rounded w-full"
                placeholder="mm/dd/yyyy --:-- --"
              />
              <button
                onClick={handleCreateTask}
                className="
                  bg-blue-600 text-white px-4 py-2 rounded w-full
                  hover:bg-blue-700
                  hover:shadow-md
                  hover:shadow-blue-400/50
                  transition-all duration-200
                "
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
