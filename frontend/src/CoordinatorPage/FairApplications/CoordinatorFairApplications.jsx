import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./CoordinatorFairApplications.css";

const CoordinatorFairApplications = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [notesData, setNotesData] = useState("");
  const userMenuRef = useRef(null);

  const [fairApplications, setFairApplications] = useState([
    {
      id: 1,
      date: "21-12-2024",
      time: "10:00 - 14:00",
      applicant: "John Doe",
      email: "johndoe@example.com",
      city: "Ankara",
      highSchool: "Ankara Fen Lisesi",
      notes: "Interested in scholarships for top students.",
      status: null,
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
      status: null,
    },
  ]);

  const openModal = (id, decision) => {
    const application = fairApplications.find((app) => app.id === id);
    if (application.status && decision !== "cancel") {
      alert("Decision already made for this application. Changes are not allowed.");
      return;
    }
    setModalData({
      id,
      decision,
      location: application.location,
    });
    setModalVisible(true);
  };

  const handleModalConfirm = () => {
    const { id, decision } = modalData;

    setFairApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          if (decision === "cancel") {
            return { ...app, status: "cancelled" };
          }
          return { ...app, status: decision };
        }
        return app;
      })
    );
    setModalVisible(false);
  };

  const handleModalCancel = () => setModalVisible(false);

  const openNotes = (notes) => {
    setNotesData(notes);
    setNotesVisible(true);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/coordinator_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/coordinator_puantaj" className="sidebar-link">High School Database</Link>
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
            <Link to="/api/advisor" className="sidebar-link">Advisor List</Link>
          </li>
          <li>
            <Link to="/api/guide" className="sidebar-link">Guide List</Link>
          </li>
          <li>
            <Link to="/api/feed" className="sidebar-link">View Feedbacks</Link>
          </li>
        </ul>
        <div className="logout">
          <button onClick={() => (window.location.href = "/api/login/")}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Fair Applications</h1>
        <div className="application-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Applicant</th>
                <th>Contact Email</th>
                <th>City</th>
                <th>High School</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fairApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>{app.applicant}</td>
                  <td>{app.email}</td>
                  <td>{app.city}</td>
                  <td>{app.highSchool}</td>
                  <td>
                    <div className="button-container">
                      {app.status ? (
                        <>
                          <span
                            className={`status ${
                              app.status === "accepted" ? "accepted" : app.status === "rejected" ? "rejected" : "cancelled"
                            }`}
                          >
                            {app.status === "accepted"
                              ? "✔ Accepted"
                              : app.status === "rejected"
                              ? "✖ Rejected"
                              : "✖ Cancelled"}
                          </span>
                        </>
                      ) : (
                        <>
                          <button
                            className="accept-button"
                            onClick={() => openModal(app.id, "accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="reject-button"
                            onClick={() => openModal(app.id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {!app.status || app.status === "cancelled" || app.status === "rejected" ? null : (
                        <button
                          className="cancel-button"
                          onClick={() => openModal(app.id, "cancel")}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        className="view-notes-button"
                        onClick={() => openNotes(app.notes)}
                      >
                        View Notes
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes Modal */}
        {notesVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Notes</h2>
              <p>{notesData}</p>
              <button
                className="modal-close-button"
                onClick={() => setNotesVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Decision Modal */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Your Decision</h2>
              <p>
                Are you sure you want to <strong>{modalData.decision}</strong> the
                application for <strong>{modalData.location}</strong>? This
                action cannot be undone.
              </p>
              <div className="modal-actions">
                <button
                  className="confirm-button"
                  onClick={handleModalConfirm}
                >
                  Confirm
                </button>
                <button
                  className="cancel-button"
                  onClick={handleModalCancel}
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

export default CoordinatorFairApplications;
