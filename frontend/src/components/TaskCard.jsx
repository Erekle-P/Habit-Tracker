// TaskCard.jsx
import "react";

function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded shadow w-64 mb-2">
      <h4 className="font-bold mb-1">{task.title}</h4>
      <p>Status: {task.status}</p>
      <p>Deadline: {task.deadline || "N/A"}</p>
      <p>Importance: {task.importance}</p>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
  );
}

export default TaskCard;
