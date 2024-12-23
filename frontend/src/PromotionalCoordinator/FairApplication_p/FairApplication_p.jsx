import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FairApplication_p.css";

const FairApplication_p = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [notesData, setNotesData] = useState("");
  const [fairApplications, setFairApplications] = useState([]);

  // Fetch accepted fair applications from the database
  const fetchFairApplications = async () => {
    try {
      const response = await axios.get("/api/get_accepted_fair_applications/");
      setFairApplications(response.data); // Fetch all accepted applications
    } catch (error) {
      console.error("Error fetching fair applications:", error);
    }
  };

  useEffect(() => {
    fetchFairApplications();
  }, []);

  const openModal = (id) => {
    setModalData({ id });
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    const { id } = modalData;
    try {
      await axios.post("/api/update_fair_application_status/", {
        id,
        status: "rejected", // Change status to 'cancelled'
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
            <Link to="/api/promo_coordinator_dashboard" className="sidebar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/api/promotional_coordinator_pauntaj" className="sidebar-link">
              Puantaj Page
            </Link>
          </li>
          <li>
            <Link to="/api/promo_coordinator_fair_application" className="sidebar-link">
              Fair Applications
            </Link>
          </li>
          <li>
            <Link to="/api/promo_coordinator_tour_application" className="sidebar-link">
              Tour Applications
            </Link>
          </li>
          <li>
            <Link to="/api/promotional_coordinator_feedback" className="sidebar-link">
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
            Dilek Yıldız
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

        <h1>Accepted Fair Applications</h1>
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
                        className="cancel-button"
                        onClick={() => openModal(app.id)}
                      >
                        Cancel
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

        {/* Cancel Confirmation Modal */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Cancellation</h2>
              <p>
                Are you sure you want to <strong>cancel</strong> this application? This action
                cannot be undone.
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

export default FairApplication_p;
