import "react";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const TaskBoard = ({ tasks = [] }) => {
  return (
    <div className="task-board">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} status={task.status} />
        ))
      ) : (
        <p>No tasks available</p> // ✅ Prevents crashing if tasks is empty or undefined
      )}
    </div>
  );
};

// ✅ Add PropTypes for validation
TaskBoard.propTypes = {
  tasks: PropTypes.array, // Ensure tasks is an array
};

export default TaskBoard;
