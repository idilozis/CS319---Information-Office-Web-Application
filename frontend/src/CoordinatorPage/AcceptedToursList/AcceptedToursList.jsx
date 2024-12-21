import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AcceptedToursList.css";

const AcceptedToursList = () => {
  const [notesVisible, setNotesVisible] = useState(false);
  const [notesContent, setNotesContent] = useState("");

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
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return days[date.getDay()];
  };
 
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/coordinator_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/coordinator_highschool_database" className="sidebar-link">High School Database</Link>
          </li>
          <li>
            <Link to="/api/coordinator_puantaj" className="sidebar-link">Puantaj Page</Link>
          </li>
          <li>
            <Link to="/api/coordinator_fair_applications" className="sidebar-link">Fair Applications</Link>
          </li>
          <li>
            <Link to="/api/coordinator_accepted_tours" className="sidebar-link">Tour Applications</Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_advisor_list" className="sidebar-link">Advisor List</Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_guide_list" className="sidebar-link">Guide List</Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_feedback" className="sidebar-link">View Feedbacks</Link>
          </li>
        </ul>
        <div className="logout">
          <button onClick={() => (window.location.href = "/api/login/")}>Logout</button>
        </div>
      </div>

      <div className="main-content">
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

export default AcceptedToursList;
