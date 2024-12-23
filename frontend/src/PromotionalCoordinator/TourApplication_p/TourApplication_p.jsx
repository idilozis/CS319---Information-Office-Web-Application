import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TourApplication_p.css";

const TourApplication_p = () => {
  const [selectedType, setSelectedType] = useState("highschool"); // High School by default
  const [applications, setApplications] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [viewNotes, setViewNotes] = useState("");
  const userMenuRef = useRef(null);

  // Fetch Applications based on Selected Type
  const fetchApplications = async () => {
    const endpoint =
      selectedType === "highschool"
        ? "/api/accepted_highschool_tours/"
        : "/api/accepted_individual_tours/";
    try {
      const response = await axios.get(endpoint);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedType]);

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

  const handleCancel = async () => {
    try {
      await axios.post("/api/update_tour_status/", {
        type: selectedType,
        id: selectedApplicationId,
        status: "rejected",
      });
      fetchApplications(); // Refresh the data after cancellation
      setConfirmationVisible(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const openNotes = (notes) => setViewNotes(notes || "No additional notes provided.");

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
            Kemal Çakır
          </div>
          {menuVisible && (
            <div className="dropdown-menu">
              <button onClick={() => (window.location.href = "/api/settings/")}>Settings</button>
              <button onClick={() => (window.location.href = "/api/login/")}>Logout</button>
            </div>
          )}
        </div>

        <h1>Welcome Back, Kemal Çakır</h1>

        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${
              selectedType === "highschool" ? "active" : ""
            }`}
            onClick={() => setSelectedType("highschool")}
          >
            High School Applications
          </button>
          <button
            className={`toggle-button ${
              selectedType === "individual" ? "active" : ""
            }`}
            onClick={() => setSelectedType("individual")}
          >
            Individual Applications
          </button>
        </div>

        {/* Applications Table */}
        <table className="application-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Time</th>
              {selectedType === "highschool" && <th>High School</th>}
              {selectedType === "highschool" && <th>Counselor</th>}
              {selectedType === "individual" && <th>Name</th>}
              <th>Contact</th>
              {selectedType === "highschool" && <th>Student Count</th>}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.date}</td>
                <td>
                  {new Date(app.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </td>
                <td>{app.time_slot}</td>
                {selectedType === "highschool" && <td>{app.highschool || "-"}</td>}
                {selectedType === "highschool" && <td>{app.counselor_name || "-"}</td>}
                {selectedType === "individual" && <td>{app.name || "-"}</td>}
                <td>
                  {app.contact_phone || "-"}, {app.contact_email || "-"}
                </td>
                {selectedType === "highschool" && <td>{app.capacity || app.student_count}</td>}
                <td>
                  {app.status !== "cancelled" ? (
                    <button
                      className="cancel-button"
                      onClick={() => {
                        setSelectedApplicationId(app.id);
                        setConfirmationVisible(true);
                      }}
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
      {viewNotes && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Application Notes</h2>
            <p>{viewNotes}</p>
            <button
              className="modal-close-button"
              onClick={() => setViewNotes("")}
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
            <p>Are you sure you want to cancel this application?</p>
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
  );
};

export default TourApplication_p;
