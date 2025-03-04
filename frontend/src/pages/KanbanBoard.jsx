// src/pages/KanbanBoard.jsx
import { useEffect, useState } from "react";
import { getTasks, updateTask } from "../api";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  // ADDED: local state to show dog GIF when status changes
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADDED: auto-hide the GIF after 3 seconds
  useEffect(() => {
    if (gifUrl) {
      const timer = setTimeout(() => {
        setGifUrl(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gifUrl]);

  const fetchTasks = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const data = await getTasks(accessToken);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const taskToUpdate = tasks.find((t) => t.id === taskId);
      if (taskToUpdate) {
        await updateTask(taskId, { status: newStatus }, accessToken);

        // ADDED: check transitions to show dog GIF
        if (taskToUpdate.status === "TO_DO" && newStatus === "IN_PROGRESS") {
          setGifUrl("/src/pic/working-dog.gif");
        } else if (taskToUpdate.status === "IN_PROGRESS" && newStatus === "DONE") {
          setGifUrl("/src/pic/yeay-dog.gif");
        }

        fetchTasks();
      }
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const toDo = tasks.filter((t) => t.status === "TO_DO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const done = tasks.filter((t) => t.status === "DONE");

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">📌 Kanban Board (Tasks)</h2>

      {/* ADDED: Show dog GIF if available */}
      {gifUrl && (
        <div className="mb-4 text-center">
          <img
            src={gifUrl}
            alt="Dog gif"
            style={{ maxHeight: "200px", margin: "0 auto" }}
          />
        </div>
      )}

      <div className="flex gap-4">
        {/* TO DO Column */}
        <div
          className="p-4 rounded-md shadow-md w-1/3"
          style={{ backgroundColor: "#ffcccc" }} // light red
        >
          <h3 className="font-bold mb-2">To Do</h3>
          {toDo.map((task) => (
            <div key={task.id} className="mb-2 p-2 bg-sky-100 rounded">
              <p>{task.title}</p>
              <button
                className="text-sm text-blue-600 underline"
                onClick={() => moveTask(task.id, "IN_PROGRESS")}
              >
                Move to In Progress
              </button>
            </div>
          ))}
        </div>

        {/* IN PROGRESS Column */}
        <div
          className="p-4 rounded-md shadow-md w-1/3"
          style={{ backgroundColor: "#fffacc" }} // light yellow
        >
          <h3 className="font-bold mb-2">In Progress</h3>
          {inProgress.map((task) => (
            <div key={task.id} className="mb-2 p-2 bg-sky-100 rounded">
              <p>{task.title}</p>
              <button
                className="text-sm text-blue-600 underline"
                onClick={() => moveTask(task.id, "DONE")}
              >
                Move to Done
              </button>
            </div>
          ))}
        </div>

        {/* DONE Column */}
        <div
          className="p-4 rounded-md shadow-md w-1/3"
          style={{ backgroundColor: "#ccffcc" }} // light green
        >
          <h3 className="font-bold mb-2">Done</h3>
          {done.map((task) => (
            <div key={task.id} className="mb-2 p-2 bg-sky-100 rounded">
              <p>{task.title}</p>
              <button
                className="text-sm text-blue-600 underline"
                onClick={() => moveTask(task.id, "TO_DO")}
              >
                Move back to To Do
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
