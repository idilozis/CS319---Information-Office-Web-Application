import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CoordinatorFairApplications.css";

const CoordinatorFairApplications = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [notesData, setNotesData] = useState("");
  const [fairApplications, setFairApplications] = useState([]);

  // Fetch fair applications from the database
  const fetchFairApplications = async () => {
    try {
      const response = await axios.get("/api/get_fair_applications/");
      const pendingApplications = response.data.filter(
        (app) => app.status === "pending"
      ); // Only keep pending applications
      setFairApplications(pendingApplications);
    } catch (error) {
      console.error("Error fetching fair applications:", error);
    }
  };

  useEffect(() => {
    fetchFairApplications();
  }, []);

  const openModal = (id, decision) => {
    setModalData({ id, decision });
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    const { id, decision } = modalData;
    try {
      await axios.post("/api/update_fair_application_status/", {
        id,
        status: decision,
      });
      fetchFairApplications(); // Refresh the list
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleModalCancel = () => setModalVisible(false);

  const openNotes = (notes) => {
    setNotesData(notes);
    setNotesVisible(true);
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
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
            <Link to="/api/coordinator_dashboard" className="sidebar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_highschool_database" className="sidebar-link">
              High School Database
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_puantaj" className="sidebar-link">
              Puantaj Page
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_fair_applications" className="sidebar-link">
              Fair Applications
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_accepted_tours" className="sidebar-link">
              Tours
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_advisor_list" className="sidebar-link">
              Advisor List
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_guide_list" className="sidebar-link">
              Guide List
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_view_feedback" className="sidebar-link">
              View Feedbacks
            </Link>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fairApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>{app.name}</td>
                  <td>{app.contact_email}</td>
                  <td>{app.city}</td>
                  <td>{app.highschool_name}</td>
                  <td>
                    <div className="button-container">
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
                      <button
                        className="view-notes-button"
                        onClick={() => openNotes(app.additional_notes)}
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
                Are you sure you want to <strong>{modalData.decision}</strong> the application?
                This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button className="confirm-button" onClick={handleModalConfirm}>
                  Confirm
                </button>
                <button className="cancel-button" onClick={handleModalCancel}>
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
