import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ViewFeedback.css";

const ViewFeedback = () => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]); // Dynamic feedback data
  const userMenuRef = useRef(null);

  // Fetch feedback data from the database
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("/api/feedbacks/"); // Replace with your API endpoint
      setFeedbackList(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks(); // Fetch data on component mount
  }, []);

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
            <Link to="/api/coordinator_accepted_tours" className="sidebar-link">Tours</Link>
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
                  <td>{feedback.highschool}</td>
                  <td>{feedback.tour_type}</td>
                  <td>{feedback.tour_date}</td>
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
