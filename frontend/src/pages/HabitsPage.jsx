import React, { useEffect, useState } from "react";
import { getHabits } from "../api";
import HabitCard from "../components/HabitCard";

function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const loadHabits = async () => {
    try {
      const data = await getHabits(accessToken);
      setHabits(data);
    } catch (error) {
      console.error("Failed to load habits:", error);
    }
  };

  useEffect(() => {
    loadHabits();
  }, [accessToken]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Habits</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} refreshHabits={loadHabits} />
        ))}
      </div>
    </div>
  );
}

export default HabitsPage;
