import TaskCard from "./TaskCard";
import "../styles/TaskBoard.css";

const TaskBoard = () => {
  return (
    <div className="task-board">
      <div className="column">
        <h3>To Do</h3>
        <TaskCard title="Design UI" status="To Do" />
        <TaskCard title="Fix Bugs" status="To Do" />
      </div>
      <div className="column">
        <h3>In Progress</h3>
        <TaskCard title="Develop API" status="In Progress" />
      </div>
      <div className="column">
        <h3>Completed</h3>
        <TaskCard title="Database Setup" status="Completed" />
      </div>
    </div>
  );
};

export default TaskBoard;
