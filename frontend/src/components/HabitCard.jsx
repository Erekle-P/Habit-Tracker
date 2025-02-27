import { useState } from "react";
import PropTypes from "prop-types";
import { updateHabit, deleteHabit } from "../api";

function HabitCard({ habit, refreshHabits }) {
  // Local state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(habit.title);
  const [editedFreq, setEditedFreq] = useState(habit.frequency);

  const accessToken = localStorage.getItem("accessToken");

  const handleEdit = async () => {
    try {
      await updateHabit(habit.id, { title: editedTitle, frequency: editedFreq }, accessToken);
      setIsEditing(false);
      if (refreshHabits) refreshHabits(); // refresh parent list after update
    } catch (err) {
      console.error("Failed to update habit:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      try {
        await deleteHabit(habit.id, accessToken);
        if (refreshHabits) refreshHabits(); // refresh parent list after deletion
      } catch (err) {
        console.error("Failed to delete habit:", err);
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
          <select
            value={editedFreq}
            onChange={(e) => setEditedFreq(e.target.value)}
            className="border p-1 mb-1 w-full"
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
          <button onClick={handleEdit} className="bg-green-600 text-white px-2 py-1 rounded mr-1">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-2 py-1 rounded">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4 className="font-bold mb-1">{habit.title}</h4>
          <p>Frequency: {habit.frequency}</p>
          <p className="text-sm text-gray-500">{habit.description}</p>
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

HabitCard.propTypes = {
  habit: PropTypes.object.isRequired,
  refreshHabits: PropTypes.func, // Optional callback to refresh parent list
};

export default HabitCard;
