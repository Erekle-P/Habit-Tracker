// HabitCard.jsx
import "react";
import PropTypes from "prop-types";

function HabitCard({ habit }) {
  return (
    <div className="bg-white p-4 rounded shadow w-64 mb-2">
      <h4 className="font-bold mb-1">{habit.title}</h4>
      <p>Frequency: {habit.frequency}</p>
      <p className="text-sm text-gray-500">{habit.description}</p>
    </div>
  );
}

export default HabitCard;
