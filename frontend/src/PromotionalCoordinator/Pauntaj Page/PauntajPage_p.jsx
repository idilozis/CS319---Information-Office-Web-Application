import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PauntajPage_p.css";

const PauntajPage_p = () => {
  const DUMMY_RATE_TOUR = 150; // Dummy rate per tour hour
  const DUMMY_RATE_FAIR = 250; // Dummy rate per fair hour

  const [guides] = useState([
    { name: "Ahmet Yavuzhan Er", tourHours: 17, fairHours: 0 },
    { name: "John Doe", tourHours: 24, fairHours: 0 },
    { name: "Zeynep Dönmez", tourHours: 67, fairHours: 7 },
    { name: "Ali Yıldırım", tourHours: 45, fairHours: 0 },
    { name: "Berker Kara", tourHours: 0, fairHours: 0 },
    { name: "Sıla Yılmaz", tourHours: 8, fairHours: 24 },
  ]);

  const calculatePayroll = (tourHours, fairHours) => {
    return tourHours * DUMMY_RATE_TOUR + fairHours * DUMMY_RATE_FAIR;
  };

  const calculateTotalHours = (tourHours, fairHours) => {
    return tourHours + fairHours;
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

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
            <Link to="/api/promo_coordinator_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/promotional_coordinator_pauntaj" className="sidebar-link">Puantaj Page</Link>
          </li>
          <li>
            <Link to="/api/promo_coordinator_fair_application" className="sidebar-link">Fair Applications</Link>
          </li>
          <li>
            <Link to="/api/promo_coordinator_tour_application" className="sidebar-link">Tour Applications</Link>
          </li>
          <li>
            <Link to="/api/promotional_coordinator_feedback" className="sidebar-link">View Feedbacks</Link>
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
              {guides.map((guide, index) => (
                <tr key={index}>
                  <td>{guide.name}</td>
                  <td>{guide.tourHours}</td>
                  <td>{guide.fairHours}</td>
                  <td>{calculateTotalHours(guide.tourHours, guide.fairHours)}</td>
                  <td>{calculatePayroll(guide.tourHours, guide.fairHours)} ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PauntajPage_p;
