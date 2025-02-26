import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getHabits, getTasks } from "../api";

// Helper function to generate recurring habit events based on frequency
const generateHabitEvents = (habit) => {
  const events = [];
  // Parse the creation date from the habit's created_at field
  const startDate = new Date(habit.created_at);
  const frequency = habit.frequency; // "DAILY", "WEEKLY", or "MONTHLY"

  if (frequency === "DAILY") {
    // Create an event for each day for 30 days
    for (let i = 0; i < 30; i++) {
      const eventDate = new Date(startDate);
      eventDate.setDate(startDate.getDate() + i);
      events.push({
        id: `habit-${habit.id}-${i}`,
        title: `[Habit] ${habit.title}`,
        start: eventDate.toISOString().slice(0, 10),
        backgroundColor: "#34d399", // green
        borderColor: "#10b981",
        extendedProps: {
          type: "habit",
          frequency: habit.frequency,
          description: habit.description,
        },
      });
    }
  } else if (frequency === "WEEKLY") {
    // Create an event for each week for 4 weeks
    for (let i = 0; i < 4; i++) {
      const eventDate = new Date(startDate);
      eventDate.setDate(startDate.getDate() + i * 7);
      events.push({
        id: `habit-${habit.id}-${i}`,
        title: `[Habit] ${habit.title}`,
        start: eventDate.toISOString().slice(0, 10),
        backgroundColor: "#34d399",
        borderColor: "#10b981",
        extendedProps: {
          type: "habit",
          frequency: habit.frequency,
          description: habit.description,
        },
      });
    }
  } else if (frequency === "MONTHLY") {
    // Only one event for monthly habits (at creation date)
    events.push({
      id: `habit-${habit.id}-0`,
      title: `[Habit] ${habit.title}`,
      start: startDate.toISOString().slice(0, 10),
      backgroundColor: "#34d399",
      borderColor: "#10b981",
      extendedProps: {
        type: "habit",
        frequency: habit.frequency,
        description: habit.description,
      },
    });
  }
  return events;
};

function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const [habits, tasks] = await Promise.all([getHabits(token), getTasks(token)]);

      // For habits: generate recurring events based on frequency
      let habitEvents = [];
      habits.forEach((h) => {
        habitEvents = habitEvents.concat(generateHabitEvents(h));
      });

      // Convert tasks to calendar events
      const taskEvents = tasks.map((t) => ({
        id: `task-${t.id}`,
        title: `[Task] ${t.title}`,
        start: t.deadline ? t.deadline : t.created_at.slice(0, 10),
        backgroundColor: "#f97316", // orange
        borderColor: "#ea580c",
        extendedProps: {
          type: "task",
          status: t.status,
          importance: t.importance,
          description: t.description,
        },
      }));

      setEvents([...habitEvents, ...taskEvents]);
    } catch (err) {
      console.error("Failed to fetch habits/tasks for calendar:", err);
    }
  };

  const handleEventClick = (info) => {
    const { title, extendedProps } = info.event;
    let details = `Title: ${title}\nType: ${extendedProps.type}\n`;
    if (extendedProps.type === "habit") {
      details += `Frequency: ${extendedProps.frequency}\nDescription: ${extendedProps.description || "N/A"}`;
    } else {
      details += `Status: ${extendedProps.status}\nImportance: ${extendedProps.importance}\nDescription: ${extendedProps.description || "N/A"}`;
    }
    alert(details);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">📅 Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default CalendarPage;
