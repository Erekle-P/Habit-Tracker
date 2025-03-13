import { Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import HabitsPage from "./pages/HabitsPage";
import NotesPage from "./pages/NotesPage";
import CalendarPage from "./pages/CalendarPage";
import KanbanBoard from "./pages/KanbanBoard";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// Optionally add SettingsPage if you create one

function App() {
  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
      </Routes>
      
      <footer
        style={{
          textAlign: "center",
          padding: "10px",
          background: "#f8f9fa",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        © 2025 Erekle | All Rights Reserved
      </footer>
    </DndProvider>
  );
}

export default App;
