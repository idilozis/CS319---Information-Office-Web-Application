import './ResponsibleAdvisors.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";

function ResponsibleAdvisors() {
    const advisors = [
        { weekday: 'Monday', name: 'Ahmet Yavuzhan Er', contact: '123 456 78 90' },
        { weekday: 'Tuesday', name: 'John Doe', contact: '123 456 78 90' },
        { weekday: 'Wednesday', name: 'Zeynep Dönmez', contact: '123 456 78 90' },
        { weekday: 'Thursday', name: 'Kemal Çakır', contact: '123 456 78 90' },
        { weekday: 'Friday', name: 'Berker Karakaş', contact: '123 456 78 90' },
        { weekday: 'Saturday', name: 'Sıla Yılmaz', contact: '123 456 78 90' },
        { weekday: 'Sunday', name: 'Zeynep Dursun', contact: '123 456 78 90' }
    ];
    const [menuVisible, setMenuVisible] = useState(false);
    const userMenuRef = useRef(null);
    useEffect(() => {
        function handleOutsideClick(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setMenuVisible(false); // Close the menu
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
      <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/guide_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/accepted_tours" className="sidebar-link">Tours</Link>
          </li>
          <li>
            <Link to="/api/guide_fairs" className="sidebar-link">Fairs</Link>
          </li>
          <li>
            <Link to="/api/responsible_advisors" className="sidebar-link">Responsible Advisors</Link>
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
        </div>
        
        <div className="advisor-container">
        <div className="advisor-content">
            <h3>Responsible Advisors</h3>
            <div className="advisor-table">
                <table>
                    <thead>
                        <tr>
                            <th>Weekday</th>
                            <th>Advisor Name</th>
                            <th>Contact Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {advisors.map((advisor, index) => (
                            <tr key={index}>
                                <td>{advisor.weekday}</td>
                                <td>{advisor.name}</td>
                                <td>{advisor.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        </div>
    );
}

export default ResponsibleAdvisors;
