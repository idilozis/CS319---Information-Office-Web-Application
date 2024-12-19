import React, { useState, useEffect, useRef } from "react";
import "./FairPage.css";

const FairPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = "Kemal Çakır"; // Current user's name
  const [fairs, setFairs] = useState([
    {
      highSchool: "Izmir Fen Lisesi",
      city: "Izmir",
      date: "18-12-2024",
      time: "12:30",
      attendees: ["Idil"],
    },
    {
      highSchool: "Ankara Gazi Lisesi",
      city: "Ankara",
      date: "18-12-2024",
      time: "10:00",
      attendees: [],
    },
    {
      highSchool: "Istanbul High School",
      city: "Istanbul",
      date: "19-12-2024",
      time: "14:00",
      attendees: [],
    },
  ]);
  const userMenuRef = useRef(null);

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

  const handleAddAttendee = (index) => {
    const selectedFair = fairs[index];
    // Check if user is already registered for another fair on the same date
    const isAlreadyRegistered = fairs.some(
      (fair, i) =>
        fair.date === selectedFair.date &&
        fair.attendees.includes(userName) &&
        i !== index
    );

    if (isAlreadyRegistered) {
      alert("You can only add yourself to one fair on the same date.");
      return;
    }

    // Update the attendees for the selected fair
    const updatedFairs = [...fairs];
    updatedFairs[index].attendees.push(userName);
    setFairs(updatedFairs);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <a href="/api/advisor_dashboard" className="sidebar-link">Dashboard</a>
          </li>
          <li>
            <a href="/tour-applications" className="sidebar-link">Tour Applications</a>
          </li>
          <li>
            <a href="/tours" className="sidebar-link">Tours</a>
          </li>
          <li>
            <a href="/api/fairs" className="sidebar-link">Fairs</a>
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
              <button onClick={() => alert("Go to Settings")}>Settings</button>
              <button onClick={() => (window.location.href = "/api/login/")}>
                Logout
              </button>
            </div>
          )}
        </div>

        <h1>Fair Details</h1>
        <div className="fair-table">
          <table>
            <thead>
              <tr>
                <th>High School</th>
                <th>City</th>
                <th>Date</th>
                <th>Time</th>
                <th>Attendees</th>
              </tr>
            </thead>
            <tbody>
              {fairs.map((fair, fairIndex) => (
                <tr key={fairIndex}>
                  <td>{fair.highSchool}</td>
                  <td>{fair.city}</td>
                  <td>{fair.date}</td>
                  <td>{fair.time}</td>
                  <td>
                    <ul>
                      {fair.attendees.map((attendee, attendeeIndex) => (
                        <li key={attendeeIndex}>{attendee}</li>
                      ))}
                    </ul>
                    {/* Disable button if the user has added themselves */}
                    {!fair.attendees.includes(userName) && (
                      <button
                        onClick={() => handleAddAttendee(fairIndex)}
                        style={{ marginTop: "5px" }}
                      >
                        Add Yourself
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FairPage;
