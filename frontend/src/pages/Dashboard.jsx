import React, { useState, useEffect } from "react";
import { getHabits, createHabit, createTask } from "../api";
// If you have separate pages for edit/delete, those components (HabitCard, TaskCard) can be used there.
 
function Dashboard() {
  // Quick add inputs
  const [habitTitle, setHabitTitle] = useState("");
  const [habitFreq, setHabitFreq] = useState("DAILY");
  const [habitTime, setHabitTime] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  
  // Daily habits overview (checklist)
  const [dailyHabits, setDailyHabits] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

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

  useEffect(() => {
    loadHabits();
  }, [accessToken]);

  const handleCreateHabit = async () => {
    try {
      const payload = {
        title: habitTitle,
        frequency: habitFreq,
        preferred_time: habitTime.trim() === "" ? null : habitTime,
      };
      await createHabit(payload, accessToken);
      alert("Habit created!");
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
      setTaskTitle("");
      setTaskDeadline("");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  return (
    <div className="p-6 text-center">
      <div className="paper">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        
        {/* Overview of Daily Habits */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Overview of Daily Habits 📊</h3>
          {dailyHabits.length === 0 ? (
            <p>No daily habits yet.</p>
          ) : (
            <ul className="text-left">
              {dailyHabits.map((habit) => (
                <li key={habit.id} className="flex items-center space-x-2">
                  <input type="checkbox" /> {/* This is just UI; you may later hook it to an update */}
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
              <button onClick={handleCreateHabit} className="bg-green-600 text-white px-4 py-2 rounded w-64">
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
              <button onClick={handleCreateTask} className="bg-blue-600 text-white px-4 py-2 rounded w-64">
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
