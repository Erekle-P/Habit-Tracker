import { useState } from "react";
import { createHabit, createTask } from "../api";

function Dashboard() {
  // State for habit fields
  const [habitTitle, setHabitTitle] = useState("");
  const [habitFreq, setHabitFreq] = useState("DAILY");
  const [habitTime, setHabitTime] = useState(""); // Preferred time input

  // State for note (task) fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(""); // Date & time input for note

  // Function to format time string (HH:MM => HH:MM:00)
  const formatTime = (timeStr) => {
    if (timeStr && timeStr.trim() !== "") {
      // If time is in HH:MM format (length 5), append ":00"
      return timeStr.length === 5 ? `${timeStr}:00` : timeStr;
    }
    return null;
  };

  // Function to format datetime string (YYYY-MM-DDTHH:MM => YYYY-MM-DDTHH:MM:00)
  const formatDateTime = (dateTimeStr) => {
    if (dateTimeStr && dateTimeStr.trim() !== "") {
      // If datetime is in YYYY-MM-DDTHH:MM format (length 16), append ":00"
      return dateTimeStr.length === 16 ? `${dateTimeStr}:00` : dateTimeStr;
    }
    return null;
  };

  // Create habit including preferred_time (converted to proper format)
  const handleCreateHabit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const payload = {
        title: habitTitle,
        frequency: habitFreq,
        // Convert empty string to null; format time if provided
        preferred_time: formatTime(habitTime),
      };
      await createHabit(payload, accessToken);
      alert("Habit created!");
      // Clear inputs
      setHabitTitle("");
      setHabitTime("");
    } catch (err) {
      console.error("Failed to create habit:", err);
    }
  };

  // Create note (task) including deadline (converted to proper format)
  const handleCreateTask = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const payload = {
        title: taskTitle,
        // Convert empty string to null; format datetime if provided
        deadline: formatDateTime(taskDeadline),
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
        <h2 className="text-2xl font-bold mb-4">☁️ Welcome to Your Dashboard</h2>

        {/* Quick Create Habit */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Create Habit</h3>
          <input
            type="text"
            placeholder="Habit title"
            value={habitTitle}
            onChange={(e) => setHabitTitle(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <select
            value={habitFreq}
            onChange={(e) => setHabitFreq(e.target.value)}
            className="p-2 border rounded mr-2"
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
          {/* Preferred Time Input */}
          <input
            type="time"
            value={habitTime}
            onChange={(e) => setHabitTime(e.target.value)}
            className="p-2 border rounded mr-2"
            placeholder="Preferred Time"
          />
          <button
            onClick={handleCreateHabit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Habit
          </button>
        </div>

        {/* Quick Create Note */}
        <div>
          <h3 className="text-lg font-bold mb-2">Create Note</h3>
          <input
            type="text"
            placeholder="Note title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          {/* Date & Time Input for the Note */}
          <input
            type="datetime-local"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            className="p-2 border rounded mr-2"
          />
          <button
            onClick={handleCreateTask}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
