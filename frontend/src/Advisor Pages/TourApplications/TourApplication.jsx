import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./TourApplication.css";

const TourApplication = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [notesData, setNotesData] = useState("");
  const [activePanel, setActivePanel] = useState("highschool");
  const userMenuRef = useRef(null);

 
  const assignedDay = "Saturday";


  const getDayName = (dateString) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString.split(".").reverse().join("-"));
    return days[date.getDay()];
  };

  const [highSchoolApplications, setHighSchoolApplications] = useState([
    {
      id: 1,
      date: "21.12.2024",
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
      notes: "High-priority application due to previous excellent performance.",
    },
    {
      id: 2,
      date: "20.12.2024",
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
      notes: "Requires careful consideration due to last year's issues.",
    },
  ]);

  const [individualApplications, setIndividualApplications] = useState([
    {
      id: 1,
      date: "21.12.2024",
      highSchool: "Private Student Application",
      priorScore: 4.0,
      student: "Ali Veli",
      contact: {
        phone: "555 987 65 43",
        email: "ali@example.com",
      },
      studentCount: 1,
      status: null,
      notes: "Application from a promising student for a private tour.",
    },
    {
      id: 2,
      date: "20.12.2024",
      highSchool: "Private Student Application",
      priorScore: 3.9,
      student: "Can Yılmaz",
      contact: {
        phone: "555 123 45 67",
        email: "can@example.com",
      },
      studentCount: 1,
      status: null,
      notes: "Requesting a private tour.",
    },
  ]);

  const handleTogglePanel = (panel) => setActivePanel(panel);

  const openModal = (id, decision, isHighSchool) => {
    const applications = isHighSchool
      ? highSchoolApplications
      : individualApplications;
    const application = applications.find((app) => app.id === id);
    if (application.status) {
      alert("Decision already made for this application. Changes are not allowed.");
      return;
    }
    setModalData({
      id,
      decision,
      highSchool: application.highSchool,
      isHighSchool,
      time: application.time || "", 
    });
    setModalVisible(true);
  };

  const handleModalConfirm = () => {
    const { id, decision, isHighSchool, time } = modalData;
    if (decision === "accepted" && !time && !isHighSchool) {
      alert("Please specify the time before confirming.");
      return;
    }

    const setApplications = isHighSchool
      ? setHighSchoolApplications
      : setIndividualApplications;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: decision, time } : app
      )
    );
    setModalVisible(false);
  };

  const handleModalCancel = () => setModalVisible(false);

  const openNotes = (notes) => {
    setNotesData(notes);
    setNotesVisible(true);
  };


  const filteredHighSchoolApplications = highSchoolApplications.filter(
    (app) => getDayName(app.date) === assignedDay
  );
  const filteredIndividualApplications = individualApplications.filter(
    (app) => getDayName(app.date) === assignedDay
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="main-content">
        <h1>Tour Applications</h1>
        <h3 className="assigned-day">Your Assigned Day: {assignedDay}</h3>
        <div className="panel-toggle">
          <button
            onClick={() => handleTogglePanel("highschool")}
            className={activePanel === "highschool" ? "active" : ""}
          >
            High School Applications
          </button>
          <button
            onClick={() => handleTogglePanel("individual")}
            className={activePanel === "individual" ? "active" : ""}
          >
            Individual Applications
          </button>
        </div>

        {/* High School Applications Table */}
        {activePanel === "highschool" && (
          <div className="application-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
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
                {filteredHighSchoolApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.date}</td>
                    <td>{getDayName(app.date)}</td>
                    <td>{app.time}</td>
                    <td>{app.highSchool}</td>
                    <td>{app.priorScore}</td>
                    <td>{app.counselor}</td>
                    <td>
                      {app.contact.phone || "N/A"}, {app.contact.email}
                    </td>
                    <td>{app.studentCount}</td>
                    <td>
                      <div className="button-container">
                        {app.status ? (
                          <span className={`status ${app.status === "accepted" ? "accepted" : "rejected"}`}>
                            {app.status === "accepted" ? "✔ Accepted" : "✖ Rejected"}
                          </span>
                        ) : (
                          <>
                            <button
                              className="accept-button"
                              onClick={() => openModal(app.id, "accepted", true)}
                            >
                              Accept
                            </button>
                            <button
                              className="reject-button"
                              onClick={() => openModal(app.id, "rejected", true)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button className="view-notes-button" onClick={() => openNotes(app.notes)}>
                          View Notes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Individual Applications Table */}
        {activePanel === "individual" && (
          <div className="application-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>High School</th>
                  <th>Prior. Score</th>
                  <th>Student</th>
                  <th>Contact</th>
                  <th>Student Count</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredIndividualApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.date}</td>
                    <td>{getDayName(app.date)}</td>
                    <td>{app.highSchool}</td>
                    <td>{app.priorScore}</td>
                    <td>{app.student}</td>
                    <td>
                      {app.contact.phone || "N/A"}, {app.contact.email}
                    </td>
                    <td>{app.studentCount}</td>
                    <td>
                      <div className="button-container">
                        {app.status ? (
                          <span className={`status ${app.status === "accepted" ? "accepted" : "rejected"}`}>
                            {app.status === "accepted" ? "✔ Accepted" : "✖ Rejected"}
                          </span>
                        ) : (
                          <>
                            <button
                              className="accept-button"
                              onClick={() => openModal(app.id, "accepted", false)}
                            >
                              Accept
                            </button>
                            <button
                              className="reject-button"
                              onClick={() => openModal(app.id, "rejected", false)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          className="view-notes-button"
                          onClick={() => openNotes(app.notes)}
                        >
                          View Notes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Notes Modal */}
        {notesVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Notes</h2>
              <p>{notesData}</p>
              <button className="modal-close-button" onClick={() => setNotesVisible(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Decision Modal */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Your Decision</h2>
              <p>
                Are you sure you want to <strong>{modalData.decision}</strong> the application for{" "}
                <strong>{modalData.highSchool}</strong>? This action cannot be undone.
              </p>
              {modalData.decision === "accepted" && !modalData.isHighSchool && (
                <div>
                  <label>Specify Time:</label>
                  <input
                    type="text"
                    placeholder="Enter time"
                    value={modalData.time}
                    onChange={(e) =>
                      setModalData({ ...modalData, time: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="modal-actions">
                <button className="confirm-button" onClick={handleModalConfirm}>Confirm</button>
                <button className="cancel-button" onClick={handleModalCancel}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourApplication;
