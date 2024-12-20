import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TourApplication.css";

const TourApplication = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const userMenuRef = useRef(null);

  const [applications, setApplications] = useState([
    {
      id: 1,
      date: "21.11.2024",
      time: "8.30-12.30",
      highSchool: "Ankara Fen Lisesi",
      priorScore: 3.76,
      counselor: "Türkan Meşe",
      contact: {
        phone: "123 456 78 91",
        email: "turkan@example.com",
      },
      studentCount: 45,
      status: null,
    },
    {
      id: 2,
      date: "28.11.2024",
      time: "16.30-19.30",
      highSchool: "Manisa Fen Lisesi",
      priorScore: 3.57,
      counselor: "Mustafa Kır",
      contact: {
        phone: "123 456 78 91",
        email: "mustafa@example.com",
      },
      studentCount: 60,
      status: null,
    },
    {
      id: 3,
      date: "28.11.2024",
      time: "16.30-19.30",
      highSchool: "Malatya Fen Lisesi",
      priorScore: 3.54,
      counselor: "Mehmet Bozkır",
      contact: {
        phone: null,
        email: "mehmet@example.com",
      },
      studentCount: 80,
      status: null,
    },
  ]);

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

  const openModal = (id, decision) => {
    const application = applications.find((app) => app.id === id);
    if (application.status) {
      alert("Decision already made for this application. Changes are not allowed.");
      return;
    }
    setModalData({ id, decision, highSchool: application.highSchool });
    setModalVisible(true);
  };

  const handleModalConfirm = () => {
    const { id, decision } = modalData;
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: decision } : app
    );
    setApplications(updatedApplications);
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/advisor_dashboard" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/api/puantaj_page" className="sidebar-link">Puantaj Page</Link>
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
              <button onClick={() => (window.location.href = "/api/settings/")}>
                Settings
              </button>
              <button onClick={() => (window.location.href = "/api/login/")}>
                Logout
              </button>
            </div>
          )}
        </div>

        <h1>Tour Applications</h1>
        <div className="application-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>High School</th>
                <th>Prior. Score</th>
                <th>Counselor</th>
                <th>Contact</th>
                <th>Student Count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className={app.status === "rejected" ? "rejected-row" : ""}>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>{app.highSchool}</td>
                  <td>{app.priorScore}</td>
                  <td>{app.counselor}</td>
                  <td>
                    <div>
                      {app.contact.phone ? <span>📞 {app.contact.phone}</span> : <span>📞 N/A</span>}
                    </div>
                    <div>
                      {app.contact.email ? (
                        <span>✉️ {app.contact.email}</span>
                      ) : (
                        <span style={{ color: "red" }}>✉️ Email Missing</span>
                      )}
                    </div>
                  </td>
                  <td>{app.studentCount}</td>
                  <td>
                    {app.status ? (
                      <span
                        className={`status ${app.status === "accepted" ? "accepted" : "rejected"}`}
                      >
                        {app.status === "accepted" ? "✔ Accepted" : "✖ Rejected"}
                      </span>
                    ) : (
                      <>
                        <button
                          className="accept-button"
                          onClick={() => openModal(app.id, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => openModal(app.id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Your Decision</h2>
              <p>
                Are you sure you want to <strong>{modalData.decision}</strong>{" "}
                the application for <strong>{modalData.highSchool}</strong>? This action cannot be
                undone.
              </p>
              <div className="modal-actions">
                <button className="confirm-button" onClick={handleModalConfirm}>
                  Confirm
                </button>
                <button className="cancel-button" onClick={handleModalCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourApplication;
