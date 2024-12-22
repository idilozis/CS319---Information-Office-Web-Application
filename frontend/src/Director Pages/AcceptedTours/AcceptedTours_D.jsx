import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./AcceptedTours_D.css";

const AcceptedTours_D = () => {
  const [notesVisible, setNotesVisible] = useState(false);
  const [notesContent, setNotesContent] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  const acceptedTours = [
    {
      name: "John Doe",
      capacity: 50,
      city: "Ankara",
      highSchool: "Ankara Fen Lisesi",
      contactPhone: "0123 456 78 90",
      contactEmail: "johndoe@example.com",
      additionalNotes: "Requires wheelchair if possible.",
      tourDate: "21-12-2024",
      timeSlot: "08:30-10:30",
    },
    {
      name: "Jane Smith",
      capacity: 40,
      city: "Istanbul",
      highSchool: "Istanbul Lisesi",
      contactPhone: "0987 654 32 10",
      contactEmail: "janesmith@example.com",
      additionalNotes: "Focus on STEM programs.",
      tourDate: "22-12-2024",
      timeSlot: "10:30-12:30",
    },
  ];

  const openNotes = (notes) => {
    setNotesContent(notes);
    setNotesVisible(true);
  };

  const getDayOfWeek = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return days[date.getDay()];
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  React.useEffect(() => {
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
            <Link to="/api/director_dashboard/" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/director_database" className="sidebar-link">High School Database</Link>
          </li>
          <li>
            <Link to="/api/director_puantaj_page" className="sidebar-link">Puantaj Page</Link>
          </li>
          <li>
            <Link to="/api/director_fair_applications" className="sidebar-link">Fair Applications</Link>
          </li>
          <li>
            <Link to="/api/director_accepted_tours" className="sidebar-link">Tour Applications</Link>
          </li>
          <li>
            <Link to="/api/director_feedback" className="sidebar-link">View Feedbacks</Link>
          </li>
        </ul>
        <div className="logout">
          <button onClick={() => (window.location.href = "/api/login/")}>Logout</button>
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

        <h1>Accepted Tour Applications</h1>
        <div className="accepted-tours-table">
          <table>
            <thead>
              <tr>
                <th>Name-Surname</th>
                <th>Capacity</th>
                <th>City</th>
                <th>High School</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
                <th>Additional Notes</th>
                <th>Tour Date</th>
                <th>Day</th>
                <th>Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {acceptedTours.map((tour, index) => (
                <tr key={index}>
                  <td>{tour.name}</td>
                  <td>{tour.capacity}</td>
                  <td>{tour.city}</td>
                  <td>{tour.highSchool}</td>
                  <td>{tour.contactPhone}</td>
                  <td>{tour.contactEmail}</td>
                  <td>
                    <button
                      className="view-notes-button"
                      onClick={() => openNotes(tour.additionalNotes)}
                    >
                      View Notes
                    </button>
                  </td>
                  <td>{tour.tourDate}</td>
                  <td>{getDayOfWeek(tour.tourDate)}</td>
                  <td>{tour.timeSlot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes Modal */}
        {notesVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Additional Notes</h2>
              <p>{notesContent}</p>
              <button
                className="modal-close-button"
                onClick={() => setNotesVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedTours_D;