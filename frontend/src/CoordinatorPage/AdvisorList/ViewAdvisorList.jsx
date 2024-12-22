import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ViewAdvisorList.css";

const ViewAdvisorList = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [advisors, setAdvisors] = useState([]); // State for advisor data
  const userMenuRef = useRef(null);

  // Fetch advisors from the API
  const fetchAdvisors = async () => {
    try {
      const response = await fetch("/api/advisors/");
      const data = await response.json();
      setAdvisors(data);
    } catch (error) {
      console.error("Error fetching advisors:", error);
    }
  };

  useEffect(() => {
    fetchAdvisors(); // Fetch advisor data on component mount
  }, []);

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

  // Sort advisors by assigned day (Monday to Sunday)
  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const sortedAdvisors = [...advisors].sort(
    (a, b) => daysOrder.indexOf(a.assigned_day) - daysOrder.indexOf(b.assigned_day)
  );

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

        <h1>Advisor List</h1>
        <div className="advisor-list-table-container">
          <table className="advisor-list-table">
            <thead>
              <tr>
                <th>Advisor Name</th>
                <th>Bilkent ID</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
                <th>Assigned Day</th>
              </tr>
            </thead>
            <tbody>
              {sortedAdvisors.map((advisor, index) => (
                <tr key={advisor.id}>
                  <td>{advisor.name}</td>
                  <td>{advisor.bilkent_id}</td>
                  <td>{advisor.contact_phone}</td>
                  <td>{advisor.contact_email}</td>
                  <td>{advisor.assigned_day}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAdvisorList;
