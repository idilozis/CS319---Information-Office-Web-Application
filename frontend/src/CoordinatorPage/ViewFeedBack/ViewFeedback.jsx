import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ViewFeedback.css";

const ViewFeedback = () => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const userMenuRef = useRef(null);

  const feedbackList = [
    {
      name: "John Doe",
      city: "Ankara",
      highSchool: "Ankara Fen Lisesi",
      tourType: "High School",
      tourDate: "21-12-2024",
      feedback: "The tour was very informative and well-organized. The guides were professional and friendly.",
    },
    {
      name: "Jane Smith",
      city: "Istanbul",
      highSchool: "Istanbul Lisesi",
      tourType: "Individual",
      tourDate: "22-12-2024",
      feedback: "Great experience! Learned a lot about the facilities. Would recommend it to others.",
    },
    // Add more feedback entries as needed
  ];

  const openFeedback = (feedback) => {
    setFeedbackContent(feedback);
    setFeedbackVisible(true);
  };

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
              <button onClick={() => (window.location.href = "/api/settings/")}>Settings</button>
              <button onClick={() => (window.location.href = "/api/login/")}>Logout</button>
            </div>
          )}
        </div>

        <h1>Feedback List</h1>
        <div className="feedback-table-container">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>High School</th>
                <th>Tour Type</th>
                <th>Tour Date</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.name}</td>
                  <td>{feedback.city}</td>
                  <td>{feedback.highSchool}</td>
                  <td>{feedback.tourType}</td>
                  <td>{feedback.tourDate}</td>
                  <td>
                    <button
                      className="view-feedback-button"
                      onClick={() => openFeedback(feedback.feedback)}
                    >
                      View Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feedback Modal */}
        {feedbackVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Feedback</h2>
              <div className="modal-content">
                <p>{feedbackContent}</p>
              </div>
              <button
                className="modal-close-button"
                onClick={() => setFeedbackVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;
