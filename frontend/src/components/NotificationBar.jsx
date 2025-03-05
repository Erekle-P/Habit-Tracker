// NotificationBar.jsx
import { useEffect, useState } from "react";
import { getTasks, getHabits } from "../api";

function NotificationBar() {
  const [notifications, setNotifications] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const [tasks, habits] = await Promise.all([getTasks(accessToken), getHabits(accessToken)]);
        const now = new Date();
        let newNotifications = [];

        // Check for tasks with deadlines in the next 15 minutes
        tasks.forEach((t) => {
          if (t.deadline) {
            const deadline = new Date(t.deadline);
            const diffMinutes = (deadline - now) / (1000 * 60);
            // ADJUSTED: Notify if within 15 minutes
            if (diffMinutes > 0 && diffMinutes <= 15) {
              newNotifications.push(
                `Task "${t.title}" is due in ${Math.ceil(diffMinutes)} minute(s).`
              );
            }
          }
        });

        // Check for daily habits: if preferred_time is set and current time is within 15 minutes
        habits.forEach((h) => {
          if (h.preferred_time) {
            // Build a date for today with the habit's preferred time
            const [hours, minutes] = h.preferred_time.split(":");
            const habitTime = new Date();
            habitTime.setHours(parseInt(hours, 10));
            habitTime.setMinutes(parseInt(minutes, 10));
            habitTime.setSeconds(0);

            // ADJUSTED: Now 15 minutes threshold (instead of 10)
            const diffMinutes = (habitTime - now) / (1000 * 60);
            if (diffMinutes > 0 && diffMinutes <= 15) {
              newNotifications.push(`It's almost time for your habit "${h.title}".`);
            }
          }
        });

        setNotifications(newNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    // Check notifications immediately and then every minute
    checkNotifications();
    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, [accessToken]);

  if (notifications.length === 0) return null;

  return (
    <div className="p-2 bg-accent-sky text-white text-center">
      {notifications.map((note, idx) => (
        <p key={idx}>{note}</p>
      ))}
    </div>
  );
}

export default NotificationBar;
