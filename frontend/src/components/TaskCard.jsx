import { useState } from "react";
import { updateTask, deleteTask } from "../api.js";

function TaskCard({ task, refreshTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline ? task.deadline.slice(0, 16) : "");
  const [editedImportance, setEditedImportance] = useState(task.importance);

  const accessToken = localStorage.getItem("accessToken");

  const handleEdit = async () => {
    try {
      await updateTask(task.id, { title: editedTitle, deadline: editedDeadline, importance: editedImportance }, accessToken);
      setIsEditing(false);
      refreshTasks && refreshTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task.id, accessToken);
        refreshTasks && refreshTasks();
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-64 mb-2 paper">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border p-1 mb-1 w-full"
          />
          <input
            type="datetime-local"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
            className="border p-1 mb-1 w-full"
          />
          <input
            type="number"
            value={editedImportance}
            onChange={(e) => setEditedImportance(e.target.value)}
            className="border p-1 mb-1 w-full"
            min="1"
            max="5"
          />
          <button onClick={handleEdit} className="bg-green-600 text-white px-2 py-1 rounded mr-1">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-2 py-1 rounded">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4 className="font-bold mb-1">{task.title}</h4>
          <p>Status: {task.status}</p>
          <p>Deadline: {task.deadline || "N/A"}</p>
          <p>Importance: {task.importance}</p>
          <p className="text-sm text-gray-500">{task.description}</p>
          <div className="mt-2">
            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-2 py-1 rounded mr-1">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;
