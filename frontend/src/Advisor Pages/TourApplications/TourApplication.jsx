import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TourApplication.css";

const TourApplication = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  // New State for Applications
  const [applications, setApplications] = useState([]);
  const [selectedType, setSelectedType] = useState("highschool"); // Default type

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
      const requestBody = {
        type: selectedType, // 'highschool' or 'individual'
        id: id,
        status: status,
      };
      await axios.post("/api/update_tour_status/", requestBody);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  const viewNotes = (notes) => {
    alert(notes || "No additional notes provided.");
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
              <button onClick={() => (window.location.href = "/api/settings/")}>
                Settings
              </button>
              <button onClick={() => (window.location.href = "/api/login/")}>
                Logout
              </button>
            </div>
          )}
        </div>

        <h1>Welcome Back, Kemal Çakır</h1>

        {/* Toggle Buttons */}
        <div className="toggle-buttons">
  <button
    className={`toggle-button ${selectedType === "highschool" ? "active" : ""}`}
    onClick={() => setSelectedType("highschool")}
  >
    High School Applications
  </button>
  <button
    className={`toggle-button ${selectedType === "individual" ? "active" : ""}`}
    onClick={() => setSelectedType("individual")}
  >
    Individual Applications
  </button>
</div>

<table className="application-table">
  <thead>
    <tr>
      <th>DATE</th>
      <th>DAY</th>
      <th>TIME</th>
      <th>HIGH SCHOOL</th>
      <th>COUNSELOR</th>
      <th>CONTACT</th>
      <th>STUDENT COUNT</th>
      <th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    {applications.map((app) => (
      <tr key={app.id}>
        <td>{app.date}</td>
        <td>{new Date(app.date).toLocaleDateString("en-US", { weekday: "long" })}</td>
        <td>{app.time_slot}</td>
        <td>{app.highschool}</td>
        <td>{app.counselor_name || "-"}</td>
        <td>
          {app.contact_phone}, {app.contact_email}
        </td>
        <td>{app.capacity || app.student_count}</td>
        <td>
          <div className="button-container">
            <button className="accept-button" onClick={() => updateStatus(app.id, "accepted")}>
              Accept
            </button>
            <button className="reject-button" onClick={() => updateStatus(app.id, "rejected")}>
              Reject
            </button>
            <button className="view-notes-button" onClick={() => viewNotes(app.additional_notes)}>
              View Notes
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default TourApplication;
