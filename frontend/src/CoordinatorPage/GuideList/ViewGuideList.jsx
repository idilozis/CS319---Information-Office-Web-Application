import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ViewGuideList.css";

const ViewGuideList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);
  const [guides, setGuides] = useState([]); // State for dynamic guide data

  // Fetch guides from the API
  const fetchGuides = async () => {
    try {
      const response = await axios.get("/api/guides/"); // API endpoint for fetching guides
      setGuides(response.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  useEffect(() => {
    fetchGuides(); // Fetch guide data on component mount
  }, []);

  // Filter guides by search term
  const filteredGuides = guides.filter((guide) =>
    guide.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close user menu on outside click
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
            <Link
              to="/api/coordinator_highschool_database"
              className="sidebar-link"
            >
              High School Database
            </Link>
          </li>
          <li>
            <Link to="/api/coordinator_puantaj" className="sidebar-link">
              Puantaj Page
            </Link>
          </li>
          <li>
            <Link
              to="/api/coordinator_fair_applications"
              className="sidebar-link"
            >
              Fair Applications
            </Link>
          </li>
          <li>
            <Link
              to="/api/coordinator_accepted_tours"
              className="sidebar-link"
            >
              Tours
            </Link>
          </li>
          <li>
            <Link
              to="/api/coordinator_view_advisor_list"
              className="sidebar-link"
            >
              Advisor List
            </Link>
          </li>
          <li>
            <Link
              to="/api/coordinator_view_guide_list"
              className="sidebar-link"
            >
              Guide List
            </Link>
          </li>
          <li>
            <Link
              to="/api/coordinator_view_feedback"
              className="sidebar-link"
            >
              View Feedbacks
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

        <h1>Guide List</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by guide name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="guide-list-table-container">
          <table className="guide-list-table">
            <thead>
              <tr>
                <th>Guide Name</th>
                <th>Bilkent ID</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuides.map((guide) => (
                <tr key={guide.id}>
                  <td>{guide.name}</td>
                  <td>{guide.bilkentid}</td>
                  <td>{guide.contact_phone || "N/A"}</td>
                  <td>{guide.contact_mail || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewGuideList;
