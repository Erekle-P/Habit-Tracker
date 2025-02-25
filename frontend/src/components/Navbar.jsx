import "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">TaskFlow</h1>
      <div>
        <Link to="/" className="mr-4">Dashboard</Link>
        <Link to="/kanban">Kanban Board</Link>
      </div>
    </nav>
  );
};

export default Navbar;
