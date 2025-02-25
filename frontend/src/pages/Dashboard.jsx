import TaskBoard from "../components/TaskBoard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Task Management</h2>
      <TaskBoard />
    </div>
  );
};

export default Dashboard;
