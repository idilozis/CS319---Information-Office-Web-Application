import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios"; // If you're purely using localStorage, you may not need axios
import "./ViewGuideList.css";

const ViewGuideList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  // State for dynamic guide data
  const [guides, setGuides] = useState([]);

  // State for new guide form inputs
  const [newGuide, setNewGuide] = useState({
    name: "",
    bilkentid: "",
    contact_phone: "",
    contact_mail: "",
  });

  // Fetch guides from the API (Optional - if you want to fetch from your backend initially)
  /*
  const fetchGuides = async () => {
    try {
      const response = await axios.get("/api/guides/");
      setGuides(response.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };*/
  

  // Load guides from localStorage on first render
  useEffect(() => {
    const storedGuides = JSON.parse(localStorage.getItem("guides"));
    if (storedGuides && storedGuides.length > 0) {
      setGuides(storedGuides);
    } else {
      // If local storage is empty, optionally load from server
      // fetchGuides();
    }
  }, []);

  // Whenever guides change, update localStorage
  useEffect(() => {
    localStorage.setItem("guides", JSON.stringify(guides));
  }, [guides]);

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

  // Handle changes for the "Add New Guide" form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuide((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new guide
  const handleAddGuide = (e) => {
    e.preventDefault();
    if (!newGuide.name.trim()) {
      alert("Guide Name cannot be empty.");
      return;
    }

    const newGuideEntry = {
      id: Date.now(), // Temporary ID based on timestamp
      name: newGuide.name,
      bilkentid: newGuide.bilkentid,
      contact_phone: newGuide.contact_phone,
      contact_mail: newGuide.contact_mail,
    };

    setGuides([...guides, newGuideEntry]);

    // Reset form fields
    setNewGuide({
      name: "",
      bilkentid: "",
      contact_phone: "",
      contact_mail: "",
    });
  };

  // Remove a guide by ID
  const handleRemoveGuide = (id) => {
    const updatedGuides = guides.filter((guide) => guide.id !== id);
    setGuides(updatedGuides);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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

        {/* Add New Guide Form */}
        <div className="add-guide-container">
          <h2>Add New Guide</h2>
          <form onSubmit={handleAddGuide} className="add-guide-form">
            <input
              type="text"
              name="name"
              placeholder="Guide Name"
              value={newGuide.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="bilkentid"
              placeholder="Bilkent ID"
              value={newGuide.bilkentid}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contact_phone"
              placeholder="Phone Number"
              value={newGuide.contact_phone}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="contact_mail"
              placeholder="Email Address"
              value={newGuide.contact_mail}
              onChange={handleInputChange}
            />
            <button type="submit" className="add-guide-button">
              Add Guide
            </button>
          </form>
        </div>

        {/* Guide List Table */}
        <div className="guide-list-table-container">
          <table className="guide-list-table">
            <thead>
              <tr>
                <th>Guide Name</th>
                <th>Bilkent ID</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuides.map((guide) => (
                <tr key={guide.id}>
                  <td>{guide.name}</td>
                  <td>{guide.bilkentid}</td>
                  <td>{guide.contact_phone || "N/A"}</td>
                  <td>{guide.contact_mail || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveGuide(guide.id)}
                      className="remove-guide-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {filteredGuides.length === 0 && (
                <tr>
                  <td colSpan="5">No guides found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewGuideList;
