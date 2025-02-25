import React from "react";
import { useDrag } from "react-dnd";
import "../styles/Task.css";

const Task = ({ task }) => {
  const [{ isDragging }, ref] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={ref}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
