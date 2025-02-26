import { useEffect, useState } from "react";
import { getTasks, updateTask } from "../api";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

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
      await updateTask(taskId, { status: newStatus }, accessToken);
      fetchTasks();
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
      <div className="flex gap-4">
        <div className="bg-white p-4 rounded-md shadow-md w-1/3">
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
        <div className="bg-white p-4 rounded-md shadow-md w-1/3">
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
        <div className="bg-white p-4 rounded-md shadow-md w-1/3">
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
