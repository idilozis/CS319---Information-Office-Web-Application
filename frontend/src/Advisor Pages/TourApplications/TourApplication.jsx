import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TourApplication.css";

const TourApplication = () => {
  const [selectedType, setSelectedType] = useState("highschool"); // Default type
  const [applications, setApplications] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [viewNotes, setViewNotes] = useState("");
  const userMenuRef = useRef(null);

  // Fetch Applications based on Selected Type
  const fetchApplications = async () => {
    const endpoint =
      selectedType === "highschool"
        ? "/api/highschool_tours/"
        : "/api/individual_tours/";
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

  const updateStatus = async (id, status) => {
    try {
      await axios.post("/api/update_tour_status/", {
        type: selectedType,
        id,
        status,
      });
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const openNotes = (notes) => setViewNotes(notes || "No additional notes provided.");

  const isDatePassed = (dateString) => {
    const today = new Date();
    const [year, month, day] = dateString.split("-").map(Number);
    const tourDate = new Date(year, month - 1, day);
    return tourDate < today;
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/advisor_dashboard" className="sidebar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/api/puantaj_page" className="sidebar-link">
              Puantaj Page
            </Link>
          </li>
          <li>
            <Link to="/api/tour_application" className="sidebar-link">
              Tour Applications
            </Link>
          </li>
          <li>
            <Link to="/api/advisor_tours" className="sidebar-link">
              Tours
            </Link>
          </li>
          <li>
            <Link to="/api/fairs" className="sidebar-link">
              Fairs
            </Link>
          </li>
          <li>
            <Link to="/api/guide_list" className="sidebar-link">
              Guide List
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
              {selectedType === "highschool" && <th>Time</th>}
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
              <tr key={app.id} className={isDatePassed(app.date) ? "date-passed" : ""}>
                <td>{app.date}</td>
                <td>
                  {new Date(app.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </td>
                {selectedType === "highschool" && <td>{app.time_slot}</td>}
                {selectedType === "highschool" && <td>{app.highschool || "-"}</td>}
                {selectedType === "highschool" && <td>{app.counselor_name || "-"}</td>}
                {selectedType === "individual" && <td>{app.name || "-"}</td>}
                <td>
                  {app.contact_phone || "-"}, {app.contact_email || "-"}
                </td>
                {selectedType === "highschool" && <td>{app.capacity || app.student_count}</td>}
                <td>
                  {!isDatePassed(app.date) && (
                    <div className="button-container">
                      <button
                        className="accept-button"
                        onClick={() => updateStatus(app.id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => updateStatus(app.id, "rejected")}
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>
    </div>
  );
};

export default TourApplication;
