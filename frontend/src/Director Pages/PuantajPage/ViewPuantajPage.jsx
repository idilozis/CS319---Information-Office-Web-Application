import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ViewPuantajPage.css";

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
      // Initialize each guide object with isEditing = false for edit toggling
      const fetchedGuides = response.data.map((guide) => ({
        ...guide,
        isEditing: false,
      }));
      setGuides(fetchedGuides);
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

  // Toggle edit mode for a specific guide
  const toggleEdit = (id) => {
    setGuides((prevGuides) =>
      prevGuides.map((guide) =>
        guide.id === id ? { ...guide, isEditing: !guide.isEditing } : guide
      )
    );
  };

  // Handle changes in the input fields
  const handleInputChange = (e, id, field) => {
    const { value } = e.target;
    setGuides((prevGuides) =>
      prevGuides.map((guide) => {
        if (guide.id === id) {
          // Convert numeric fields to numbers if needed
          if (field === "tour_hours" || field === "fair_hours") {
            return { ...guide, [field]: parseFloat(value) || 0 };
          }
          return { ...guide, [field]: value };
        }
        return guide;
      })
    );
  };

  // Save changes and toggle off editing
  const handleSave = (id) => {
    setGuides((prevGuides) =>
      prevGuides.map((guide) =>
        guide.id === id
          ? {
              ...guide,
              isEditing: false,
            }
          : guide
      )
    );
    // Here you could also make an API call (PUT/PATCH) to persist changes on the server
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
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/director_dashboard/" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/director_database" className="sidebar-link">High School Database</Link>
          </li>
          <li>
            <Link to="/api/director_puantaj_page" className="sidebar-link">Puantaj Page</Link>
          </li>
          <li>
            <Link to="/api/director_fair_applications" className="sidebar-link">Fair Applications</Link>
          </li>
          <li>
            <Link to="/api/director_accepted_tours" className="sidebar-link">Tours</Link>
          </li>
          <li>
            <Link to="/api/director_feedback" className="sidebar-link">View Feedbacks</Link>
          </li>
        </ul>
        <div className="logout">
          <button onClick={() => (window.location.href = "/api/login/")}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
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
            Boray Güvenç
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((guide) => {
                return guide.isEditing ? (
                  <tr key={guide.id}>
                    <td>
                      <input
                        type="text"
                        value={guide.name}
                        onChange={(e) => handleInputChange(e, guide.id, "name")}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={guide.tour_hours}
                        onChange={(e) =>
                          handleInputChange(e, guide.id, "tour_hours")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={guide.fair_hours}
                        onChange={(e) =>
                          handleInputChange(e, guide.id, "fair_hours")
                        }
                      />
                    </td>
                    <td>
                      {calculateTotalHours(guide.tour_hours, guide.fair_hours)}
                    </td>
                    <td>
                      {calculatePayroll(guide.tour_hours, guide.fair_hours)} ₺
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(guide.id)}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={guide.id}>
                    <td>{guide.name}</td>
                    <td>{guide.tour_hours}</td>
                    <td>{guide.fair_hours}</td>
                    <td>
                      {calculateTotalHours(guide.tour_hours, guide.fair_hours)}
                    </td>
                    <td>
                      {calculatePayroll(guide.tour_hours, guide.fair_hours)} ₺
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => toggleEdit(guide.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorPuantaj;
