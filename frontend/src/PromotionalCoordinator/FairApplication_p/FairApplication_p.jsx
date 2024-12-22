import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FairApplication_p.css";

const FairApplication_p = () => {
  const [viewVisible, setViewVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [viewNotes, setViewNotes] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const [applications, setApplications] = useState([
    {
        id: 1,
        date: "21-12-2024",
        time: "10:00 - 14:00",
        applicant: "John Doe",
        email: "johndoe@example.com",
        city: "Ankara",
        highSchool: "Ankara Fen Lisesi",
        notes: "Interested in scholarships for top students.",
        status: "accepted",
    },
    {
        id: 2,
        date: "20-12-2024",
        time: "13:00 - 17:00",
        applicant: "Jane Smith",
        email: "janesmith@example.com",
        city: "Istanbul",
        highSchool: "Istanbul Lisesi",
        notes: "Focus on STEM programs for students.",
        status: "pending",
    },
  ]);

  const openNotes = (notes) => {
    setViewNotes(notes);
    setViewVisible(true);
  };

  const openConfirmationModal = (id) => {
    setSelectedApplicationId(id);
    setConfirmationVisible(true);
  };

  const handleCancel = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplicationId ? { ...app, status: "cancelled" } : app
      )
    );
    setConfirmationVisible(false);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/promo_coordinator_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/promotional_coordinator_pauntaj" className="sidebar-link">Puantaj Page</Link>
          </li>
          <li>
            <Link to="/api/coordinator_fair_applications" className="sidebar-link">Fair Applications</Link>
          </li>
          <li>
            <Link to="/api/promo_coordinator_tour_application" className="sidebar-link">Tour Applications</Link>
          </li>
          <li>
            <Link to="/api/promotional_coordinator_feedback" className="sidebar-link">View Feedbacks</Link>
          </li>
        </ul>
        <div className="logout">
          <button onClick={() => (window.location.href = "/api/login/")}>
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <h1>Fair Applications</h1>
        <div className="application-table-container">
          <table className="application-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Applicant</th>
                <th>Email</th>
                <th>City</th>
                <th>High School</th>
                <th>Notes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.date}</td>
                  <td>{application.time}</td>
                  <td>{application.applicant}</td>
                  <td>{application.email}</td>
                  <td>{application.city}</td>
                  <td>{application.highSchool}</td>
                  <td>
                    <button
                      className="view-notes-button"
                      onClick={() => openNotes(application.notes)}
                    >
                      View Notes
                    </button>
                  </td>
                  <td>
                    {application.status !== "cancelled" ? (
                      <button
                        className="cancel-button"
                        onClick={() => openConfirmationModal(application.id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="cancelled-status">Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes Modal */}
        {viewVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Application Notes</h2>
              <div className="modal-content">
                <p>{viewNotes}</p>
              </div>
              <button
                className="modal-close-button"
                onClick={() => setViewVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmationVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Cancellation</h2>
              <p>
                Are you sure you want to cancel this application? This action is{" "}
                <strong>irreversible</strong>.
              </p>
              <div className="modal-actions">
                <button className="confirm-button" onClick={handleCancel}>
                  Confirm
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setConfirmationVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FairApplication_p;
