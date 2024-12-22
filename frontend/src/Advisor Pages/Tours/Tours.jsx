import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Tours.css";

const Tours = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const userMenuRef = useRef(null);

  const assignedDay = "Friday";
  const [tours, setTours] = useState([]);

  const getDayName = (dateString) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return days[date.getDay()];
  };
  const isDatePassed = (dateString) => {
    const today = new Date();
    const [year, month, day] = dateString.split("-").map(Number);
    const tourDate = new Date(year, month - 1, day);
    return tourDate < today;
  };

  // Fetch tours and resolve guide names from IDs
  const fetchTours = async () => {
    try {
      const response = await axios.get("/api/accepted_highschool_tours/"); // Fetch highschool tours
      const toursWithGuides = await Promise.all(
        response.data.map(async (tour) => {
          const guides = [];
          if (tour.guide1_id) {
            const guide1 = await fetchGuideName(tour.guide1_id);
            if (guide1) guides.push(guide1);
          }
          if (tour.guide2_id) {
            const guide2 = await fetchGuideName(tour.guide2_id);
            if (guide2) guides.push(guide2);
          }
          if (tour.guide3_id) {
            const guide3 = await fetchGuideName(tour.guide3_id);
            if (guide3) guides.push(guide3);
          }
          return { ...tour, guides };
        })
      );
      setTours(toursWithGuides);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const fetchGuideName = async (guideId) => {
    try {
      const response = await axios.get(`/api/guides/${guideId}/`); // Fetch guide details
      return response.data.name; // Return the guide's name
    } catch (error) {
      console.error(`Error fetching guide with ID ${guideId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    fetchTours(); // Fetch tours on component mount
  }, []);

  const openRemoveGuideModal = (tourId, guideIndex, guideName) => {
    setModalData({ tourId, guideIndex, guideName });
    setModalVisible(true);
  };

  const handleRemoveGuide = async () => {
    const { tourId, guideIndex } = modalData;
    try {
      const updatedTours = tours.map((tour) => {
        if (tour.id === tourId) {
          const updatedGuides = [...tour.guides];
          updatedGuides.splice(guideIndex, 1);
          return { ...tour, guides: updatedGuides };
        }
        return tour;
      });
      setTours(updatedTours);
      setModalVisible(false);
    } catch (error) {
      console.error("Error removing guide:", error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const filteredTours = tours.filter((tour) => getDayName(tour.date) === assignedDay);

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

        <h1>Tour Details</h1>
        <h3 className="assigned-day">Your Assigned Day: {assignedDay}</h3>

        <div className="application-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>High School</th>
                <th>Counselor</th>
                <th>Contact</th>
                <th>Student Count</th>
                <th>Assigned Guides</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour) => {
                const requiredGuides = Math.ceil(tour.capacity / 60); // Calculate required guides
                return (
                  <tr key={tour.id} className={isDatePassed(tour.date) ? "date-passed" : ""}>
                    <td>{tour.date}</td>
                    <td>{tour.time_slot}</td>
                    <td>{tour.highschool}</td>
                    <td>{tour.counselor_name}</td>
                    <td>
                      <div>
                        {tour.contact_phone ? <span>📞 {tour.contact_phone}</span> : <span>📞 N/A</span>}
                      </div>
                      <div>
                        ✉️ {tour.contact_email}
                      </div>
                    </td>
                    <td>{tour.capacity}</td>
                    <td>
                      <ul>
                        {tour.guides.map((guide, index) => (
                          <li key={index}>
                            {guide}
                            {index < requiredGuides ? (
                              <button
                                className="remove-guide-button"
                                onClick={() =>
                                  openRemoveGuideModal(tour.id, index, guide)
                                }
                              >
                                Remove
                              </button>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                      <p>
                        <strong>{Math.max(0, requiredGuides - tour.guides.length)}</strong> more guides needed
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Guide Removal</h2>
              <p>
                Are you sure you want to remove{" "}
                <strong>{modalData.guideName}</strong>? This action cannot be
                undone.
              </p>
              <div className="modal-actions">
                <button className="confirm-button" onClick={handleRemoveGuide}>
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

export default Tours;
