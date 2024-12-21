import React, { useState } from "react";
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

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <a href="/api/guide_dashboard" className="sidebar-link">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/api/accepted_tours" className="sidebar-link">
              Accepted Tours
            </a>
          </li>
          <li>
            <a href="/api/guide_fairs" className="sidebar-link">
              Fairs
            </a>
          </li>
          <li>
            <a href="/api/responsible_advisors" className="sidebar-link">
              Responsible Advisors
            </a>
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
