import { useDrag } from "react-dnd";
import PropTypes from "prop-types"; // Import PropTypes
import "../styles/Task.css";

function Task({ status, task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="task" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {task.name}
    </div>
  );
}

// ✅ Define expected prop types
Task.propTypes = {
  status: PropTypes.string.isRequired, // Ensure status is a required string
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired, // Ensure task object is properly structured
};

export default Task;
