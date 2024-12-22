import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HighSchoolDatabase.css";
import axios from "axios";

const HighSchoolDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [highSchools, setHighSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHighSchool, setNewHighSchool] = useState({
    name: "",
    score: "",
    city: "",
  });

  const userMenuRef = useRef(null);

  // Fetch all high schools
  useEffect(() => {
    axios
      .get("/api/get_all_highschools")
      .then((response) => {
        setHighSchools(response.data);
      })
      .catch((error) => console.error("Error fetching high schools:", error));
  }, []);

  // Filter high schools based on search term and selected city
  const filteredSchools = highSchools.filter((school) => {
    const matchesSearchTerm = school.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "All" || school.city === selectedCity;
    return matchesSearchTerm && matchesCity;
  });

  // Add a new high school to the database
  const handleAddHighSchool = () => {
    if (!newHighSchool.name || !newHighSchool.city) {
      alert("High School Name and City are required.");
      return;
    }

    axios
      .post("/api/add_highschool/", newHighSchool)
      .then((response) => {
        setHighSchools((prevHighSchools) => [...prevHighSchools, response.data]);
        setIsModalOpen(false);
        setNewHighSchool({ name: "", score: "", city: "" });
      })
      .catch((error) => {
        console.error("Error adding high school:", error);
        alert("Failed to add high school.");
      });
  };

  // Handle click outside the menu
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

        <h1>High School Database</h1>

        {/* Add High School Button */}
        <div className="add-high-school">
          <button onClick={() => setIsModalOpen(true)}>Add High School</button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by high school name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* City Filter */}
        <div className="city-filter">
          <label htmlFor="city">Filter by City:</label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="All">All</option>
            {[...new Set(highSchools.map((school) => school.city))].map(
              (city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              )
            )}
          </select>
        </div>

        <div className="high-school-table-container">
          <table className="high-school-table">
            <thead>
              <tr>
                <th>High School Name</th>
                <th>Priority Score</th>
                <th>City</th>
                <th>Applied Before</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.map((school, index) => (
                <tr
                  key={index}
                  className={highlightedRow === index ? "highlighted-row" : ""}
                  onClick={() => setHighlightedRow(index)}
                >
                  <td>{school.name}</td>
                  <td>{school.score}</td>
                  <td>{school.city}</td>
                  <td>{school.appliedBefore || "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add High School Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add High School</h2>
            <input
              type="text"
              placeholder="Enter High School Name"
              value={newHighSchool.name}
              onChange={(e) =>
                setNewHighSchool({ ...newHighSchool, name: e.target.value })
              }
              className="modal-input"
            />
            <input
              type="number"
              placeholder="Enter Priority Score"
              value={newHighSchool.score}
              onChange={(e) =>
                setNewHighSchool({ ...newHighSchool, score: e.target.value })
              }
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Enter City"
              value={newHighSchool.city}
              onChange={(e) =>
                setNewHighSchool({ ...newHighSchool, city: e.target.value })
              }
              className="modal-input"
            />
            <div className="button-container">
              <button
                className="modal-button confirm-button"
                onClick={handleAddHighSchool}
              >
                Add
              </button>
              <button
                className="modal-button cancel-button"
                onClick={() => setIsModalOpen(false)}
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

export default HighSchoolDatabase;
