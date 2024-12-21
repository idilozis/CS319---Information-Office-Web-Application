import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AcceptedTours.css";

const Tours = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const userMenuRef = useRef(null);

  const assignedDay = "Saturday"; 

  const getDayName = (dateString) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [day, month, year] = dateString.split("-").map(Number); 
    const date = new Date(year, month - 1, day); 
    return days[date.getDay()];
  };


  const [tours, setTours] = useState([
    {
      id: 1,
      date: "21-12-2024",
      time: "8.30-12.30",
      highSchool: "Ankara Fen Lisesi",
      counselor: "Türkan Meşe",
      contact: {
        phone: "123 456 78 91",
        email: "turkan@example.com",
      },
      studentCount: 50,
      guides: ["Guide 1"],
    },
    {
      id: 2,
      date: "22-12-2024",
      time: "10.00-14.00",
      highSchool: "Izmir Fen Lisesi",
      counselor: "Ayşe Yılmaz",
      contact: {
        phone: "987 654 32 10",
        email: "ayse@example.com",
      },
      studentCount: 120,
      guides: ["Guide 2", "Guide 3"],
    },
    {
      id: 3,
      date: "23-12-2024",
      time: "9.00-13.00",
      highSchool: "Istanbul Erkek Lisesi",
      counselor: "Mehmet Bozkır",
      contact: {
        phone: null,
        email: "mehmet@example.com",
      },
      studentCount: 75,
      guides: ["Guide 4"],
    },
  ]);

  const filteredTours = tours.filter((tour) => getDayName(tour.date) === assignedDay);

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

  const openRemoveGuideModal = (tourId, guideIndex, guideName) => {
    setModalData({ tourId, guideIndex, guideName });
    setModalVisible(true);
  };

  const handleRemoveGuide = () => {
    const { tourId, guideIndex } = modalData;
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
                const requiredGuides = Math.ceil(tour.studentCount / 60);
                return (
                  <tr key={tour.id}>
                    <td>{tour.date}</td>
                    <td>{tour.time}</td>
                    <td>{tour.highSchool}</td>
                    <td>{tour.counselor}</td>
                    <td>
                      <div>
                        {tour.contact.phone ? <span>📞 {tour.contact.phone}</span> : <span>📞 N/A</span>}
                      </div>
                      <div>
                        ✉️ {tour.contact.email}
                      </div>
                    </td>
                    <td>{tour.studentCount}</td>
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
                        <strong>{requiredGuides - tour.guides.length}</strong> more guides needed
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
