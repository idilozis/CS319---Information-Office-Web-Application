import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./GuideDashboard.css";

const GuideDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  const schedules = {
    "18-12-2024": [
      { time: "8.30-9.30", event: "Izmir Fen Lisesi Campus Tour"},
      { time: "9.30-10.30", event: "Meeting with Advisors"},
    ],
    "19-12-2024": [
      { time: "12.30-13.30", event: "Ankara Gazi Lisesi Fair Start"},
    ],
  };

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDateToDDMMYYYY(date);
    setSchedule(schedules[formattedDate] || []);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDateToDDMMYYYY(today);
    setSelectedDate(today);
    setSchedule(schedules[formattedDate] || []);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/guide_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/accepted_tours" className="sidebar-link">Tours</Link>
          </li>
          <li>
            <Link to="/api/guide_fairs" className="sidebar-link">Fairs</Link>
          </li>
          <li>
            <Link to="/api/responsible_advisors" className="sidebar-link">Responsible Advisors</Link>
          </li>
        </ul>
        <div className="logout">
          <button onClick={() => (window.location.href = "/api/login/")}>
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="user-menu" ref={userMenuRef}>
          <div
            className="user-icon"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <img
              src="/static/icons/userSymbol.png"
              className="user-avatar"
              alt="User Icon"
            />
            Kemal Çakır
          </div>
          {menuVisible && (
            <div className="dropdown-menu">
              <button onClick={() => (window.location.href = "/api/settings/")}>
                Settings
              </button>
              <button onClick={() => (window.location.href = "/api/login/")}>
                Logout
              </button>
            </div>
          )}
        </div>

        <h1>Welcome Back, Kemal Çakır</h1>
        <div className="calendar-schedule-container">
          <div className="calendar">
            <h2>Schedule Calendar</h2>
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>

          <div className="daily-schedule">
            <h2>Daily Schedule</h2>
            {schedule.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Time Interval</th>
                    <th>Event</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td>{item.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No schedule available for this day.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GuideDashboard;