import "../styles/TaskCard.css";

const TaskCard = ({ title, status }) => {
  return (
    <div className={`task-card ${status.toLowerCase().replace(" ", "-")}`}>
      <h4>{title}</h4>
      <p>{status}</p>
    </div>
  );
};

export default TaskCard;
