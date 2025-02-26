// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

// Import global styles
import "../src/index.css";

// If you use FullCalendar v6:
// import "@fullcalendar/core/dist/core.css";
// import "@fullcalendar/daygrid/dist/daygrid.css";
// import "@fullcalendar/timegrid/dist/timegrid.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
