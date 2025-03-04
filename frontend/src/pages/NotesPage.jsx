// NotesPage.jsx
import { useEffect, useState } from "react";
import { getTasks } from "../api";
import TaskCard from "../components/TaskCard";

function NotesPage() {
  const [tasks, setTasks] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const loadTasks = async () => {
    try {
      const data = await getTasks(accessToken);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [accessToken]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {tasks.length === 0 ? (
          // ADDED: Show message if no notes
          <p>No notes yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              refreshTasks={loadTasks}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotesPage;
