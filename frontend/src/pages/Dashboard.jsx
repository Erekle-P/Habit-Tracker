// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { getHabits, createHabit, createTask } from "../api";
import paperImage from "../pic/paper.png";
import officeDesk from "../pic/office-desk.jpg";
import goodDogGif from "../pic/good-dog.gif"; // Import for the dog GIF

function Dashboard() {
  // Quick add form state for Habit
  const [habitTitle, setHabitTitle] = useState("");
  const [habitFreq, setHabitFreq] = useState("DAILY");
  const [habitTime, setHabitTime] = useState("");

  // Quick add form state for Task (Note)
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  // State for storing daily habits (used for overview)
  const [dailyHabits, setDailyHabits] = useState([]);

  // Retrieve the JWT access token from localStorage (used to authenticate API calls)
  const accessToken = localStorage.getItem("accessToken");

  // State for showing a dog GIF after creating a habit or note
  const [gifUrl, setGifUrl] = useState(null);

  // Load daily habits when the user is logged in (accessToken exists)
  useEffect(() => {
    if (accessToken) {
      loadHabits();
    }
  }, [accessToken]);

  // Auto-hide the dog GIF after 3 seconds if it's displayed
  useEffect(() => {
    if (gifUrl) {
      const timer = setTimeout(() => {
        setGifUrl(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gifUrl]);

  // Function to fetch habits from the backend and filter for daily habits
  const loadHabits = async () => {
    try {
      const habits = await getHabits(accessToken);
      // Filter habits that have a daily frequency
      const daily = habits.filter((h) => h.frequency === "DAILY");
      setDailyHabits(daily);
    } catch (err) {
      console.error("Failed to load habits:", err);
    }
  };

  // Function to handle creation of a new habit
  const handleCreateHabit = async () => {
    try {
      const payload = {
        title: habitTitle,
        frequency: habitFreq,
        // If habitTime is empty, set it to null so backend handles it appropriately
        preferred_time: habitTime.trim() === "" ? null : habitTime,
      };
      await createHabit(payload, accessToken);
      alert("Habit created!");

      // Display the dog GIF as a success indicator
      setGifUrl(goodDogGif);

      // Reset habit input fields
      setHabitTitle("");
      setHabitTime("");

      // Refresh the habits list to include the new habit
      loadHabits();
    } catch (err) {
      console.error("Failed to create habit:", err);
    }
  };

  // Function to handle creation of a new task/note
  const handleCreateTask = async () => {
    try {
      const payload = {
        title: taskTitle,
        // If taskDeadline is empty, set it to null so backend handles it appropriately
        deadline: taskDeadline.trim() === "" ? null : taskDeadline,
      };
      await createTask(payload, accessToken);
      alert("Note created!");

      // Display the dog GIF as a success indicator
      setGifUrl(goodDogGif);

      // Reset task input fields
      setTaskTitle("");
      setTaskDeadline("");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // If no user is logged in (accessToken is missing), show a login reminder with office background
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

  // Main Dashboard view for logged in users
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

        {/* Display dog GIF as a celebration for successful creation */}
        {gifUrl && (
          <div className="mb-4">
            <img
              src={gifUrl}
              alt="Dog celebration"
              style={{ margin: "0 auto", maxHeight: "200px" }}
            />
          </div>
        )}

        {/* Daily Habits Overview Section */}
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

        {/* Quick Add Habit & Notes Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Quick Add Habit &amp; Notes ➕</h3>

          {/* Flex container for side-by-side forms */}
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
