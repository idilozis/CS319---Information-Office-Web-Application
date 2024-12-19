import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GuideList.css";

const GuideList = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  // Guide data
  const [guides, setGuides] = useState([
    {
      id: 1,
      name: "Türker Kaya",
      contact: {
        phone: "123 456 78 91",
        email: "turker.kaya@example.com",
      },
    },
    {
      id: 2,
      name: "Ayşe Yılmaz",
      contact: {
        phone: "987 654 32 10",
        email: null, // Email missing
      },
    },
    {
      id: 3,
      name: "Mehmet Bozkır",
      contact: {
        phone: null, // Phone missing
        email: "mehmet.bozkir@example.com",
      },
    },
  ]);

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
            <Link to="/api/advisor_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/tour_application" className="sidebar-link">Tour Applications</Link>
          </li>
          <li>
            <Link to="/api/advisor_tours" className="sidebar-link">Tours</Link>
          </li>
          <li>
            <Link to="/api/fairs" className="sidebar-link">Fairs</Link>
          </li>
          <li>
            <Link to="/api/guide_list" className="sidebar-link">Guide List</Link>
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
              <button onClick={() => alert("Go to Settings")}>Settings</button>
              <button onClick={() => (window.location.href = "/api/login/")}>
                Logout
              </button>
            </div>
          )}
        </div>

        <h1>Guide List</h1>
        <div className="guide-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((guide) => (
                <tr key={guide.id}>
                  <td>{guide.name}</td>
                  <td>
                    <div>
                      {guide.contact.phone ? <span>📞 {guide.contact.phone}</span> : <span>📞 N/A</span>}
                    </div>
                    <div>
                      {guide.contact.email ? <span>✉️ {guide.contact.email}</span> : <span>✉️ N/A</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuideList;
