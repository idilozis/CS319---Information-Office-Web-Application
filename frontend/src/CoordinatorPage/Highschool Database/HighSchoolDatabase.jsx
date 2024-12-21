import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HighSchoolDatabase.css";

const HighSchoolDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  const [highSchools, setHighSchools] = useState([
    {
      name: "Ankara Fen Lisesi",
      priorityScore: 4.5,
      city: "Ankara",
      appliedBefore: "Yes",
    },
    {
      name: "Istanbul Lisesi",
      priorityScore: 4.2,
      city: "Istanbul",
      appliedBefore: "No",
    },
    {
      name: "Izmir Anadolu Lisesi",
      priorityScore: 4.8,
      city: "Izmir",
      appliedBefore: "Yes",
    },
    {
      name: "Bursa Fen Lisesi",
      priorityScore: 4.0,
      city: "Bursa",
      appliedBefore: "No",
    },
  ]);

  // Get unique cities for the filter dropdown
  const cities = ["All", ...new Set(highSchools.map((school) => school.city))];

  const filteredSchools = highSchools.filter((school) => {
    const matchesSearchTerm = school.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "All" || school.city === selectedCity;
    return matchesSearchTerm && matchesCity;
  });

  const addHighSchool = () => {
    const container = document.createElement("div");
    container.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const title = document.createElement("h2");
    title.textContent = "Add High School";
    modal.appendChild(title);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter High School Name";
    nameInput.className = "modal-input";
    modal.appendChild(nameInput);

    const scoreInput = document.createElement("input");
    scoreInput.type = "number";
    scoreInput.placeholder = "Enter Priority Score";
    scoreInput.className = "modal-input";
    modal.appendChild(scoreInput);

    const cityInput = document.createElement("input");
    cityInput.type = "text";
    cityInput.placeholder = "Enter City";
    cityInput.className = "modal-input";
    modal.appendChild(cityInput);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.className = "modal-button confirm-button";
    addButton.onclick = () => {
      const newHighSchool = {
        name: nameInput.value,
        priorityScore: parseFloat(scoreInput.value) || 0,
        city: cityInput.value,
        appliedBefore: "No", // Automatically set to "No"
      };

      if (newHighSchool.name && newHighSchool.city) {
        setHighSchools((prevSchools) => [...prevSchools, newHighSchool]);
        document.body.removeChild(container);
      } else {
        alert("High School Name and City are required fields.");
      }
    };
    buttonContainer.appendChild(addButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "modal-button cancel-button";
    cancelButton.onclick = () => {
      document.body.removeChild(container);
    };
    buttonContainer.appendChild(cancelButton);

    modal.appendChild(buttonContainer);
    container.appendChild(modal);
    document.body.appendChild(container);
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
            <Link to="/api/coordinator_accepted_tours" className="sidebar-link">Tour Applications</Link>
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

        <h1>High School Database</h1>

        {/* Add High School Button */}
        <div className="add-high-school">
          <button onClick={addHighSchool}>Add High School</button>
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
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
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
                  <td>{school.priorityScore}</td>
                  <td>{school.city}</td>
                  <td>{school.appliedBefore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HighSchoolDatabase;
