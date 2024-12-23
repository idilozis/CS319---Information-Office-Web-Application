import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AcceptedToursList.css";

const AcceptedToursList= () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("highschool"); // Default tab
  const [applications, setApplications] = useState([]);
  const [viewNotes, setViewNotes] = useState("");

  // Fetch applications based on the selected tab
  const fetchApplications = async () => {
    try {
      const endpoint =
        currentTab === "highschool"
          ? "/api/accepted_highschool_tours/"
          : "/api/accepted_individual_tours/";
      const response = await axios.get(endpoint);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentTab]);

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
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return days[date.getDay()];
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

  const openNotes = (notes) => setViewNotes(notes || "No additional notes provided.");

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
            <Link to="/api/coordinator_accepted_tours" className="sidebar-link">Tours</Link>
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
        <h1>Welcome Back, Boray Güvenç</h1>
        <div className="tab-buttons">
          <button
            className={`tab-button ${currentTab === "highschool" ? "active" : ""}`}
            onClick={() => setCurrentTab("highschool")}
          >
            High School Applications
          </button>
          <button
            className={`tab-button ${currentTab === "individual" ? "active" : ""}`}
            onClick={() => setCurrentTab("individual")}
          >
            Individual Applications
          </button>
        </div>

        <div className="application-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Time</th>
                {currentTab === "highschool" && <th>High School</th>}
                {currentTab === "highschool" && <th>Counselor</th>}
                {currentTab === "individual" && <th>Name</th>}
                <th>Contact</th>
                {currentTab === "highschool" && <th>Student Count</th>}
                <th>Additional Notes</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const today = new Date();
                const [year, month, day] = app.date.split("-").map(Number);
                const applicationDate = new Date(year, month - 1, day);
                const isDatePassed = applicationDate < today;

                return (
                  <tr key={app.id} className={isDatePassed ? "date-passed" : ""}>
                    <td>{app.date}</td>
                    <td>{getDayOfWeek(app.date)}</td>
                    <td>{app.time_slot}</td>
                    {currentTab === "highschool" && <td>{app.highschool}</td>}
                    {currentTab === "highschool" && <td>{app.counselor_name}</td>}
                    {currentTab === "individual" && <td>{app.name}</td>}
                    <td>
                      <div>{app.contact_phone ? `📞 ${app.contact_phone}` : "📞 N/A"}</div>
                      <div>{`✉️ ${app.contact_email}`}</div>
                    </td>
                    {currentTab === "highschool" && <td>{app.capacity}</td>}
                    <td>
                      <button
                        className="view-notes-button"
                        onClick={() => openNotes(app.additional_notes)}
                      >
                        View Notes
                      </button>
                    </td>
                  </tr>
                );
              })}
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
      </div>
    </div>
  );
};

export default AcceptedToursList;
