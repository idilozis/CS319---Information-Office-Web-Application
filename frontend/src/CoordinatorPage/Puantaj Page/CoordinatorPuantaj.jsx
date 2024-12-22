import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CoordinatorPuantaj.css";

const CoordinatorPuantaj = () => {
  const DUMMY_RATE_TOUR = 150; // Dummy rate per tour hour
  const DUMMY_RATE_FAIR = 250; // Dummy rate per fair hour

  const [guides, setGuides] = useState([]); // Dynamic data from the database
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  // Fetch guide data from the database
  const fetchGuides = async () => {
    try {
      const response = await axios.get("/api/guides/"); // Replace with your API endpoint
      setGuides(response.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  useEffect(() => {
    fetchGuides(); // Fetch data on component mount
  }, []);

  // Calculate total payroll
  const calculatePayroll = (tourHours, fairHours) => {
    return tourHours * DUMMY_RATE_TOUR + fairHours * DUMMY_RATE_FAIR;
  };

  // Calculate total hours
  const calculateTotalHours = (tourHours, fairHours) => {
    return tourHours + fairHours;
  };

  // Close user menu on outside click
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

        <h1>Puantaj Page</h1>
        <div className="guide-table">
          <table>
            <thead>
              <tr>
                <th>Guide Name</th>
                <th>Total Tour Hours</th>
                <th>Total Fair Hours</th>
                <th>Total Hours</th>
                <th>Processed Payroll (₺)</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((guide) => (
                <tr key={guide.id}>
                  <td>{guide.name}</td>
                  <td>{guide.tour_hours}</td>
                  <td>{guide.fair_hours}</td>
                  <td>{calculateTotalHours(guide.tour_hours, guide.fair_hours)}</td>
                  <td>{calculatePayroll(guide.tour_hours, guide.fair_hours)} ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorPuantaj;
