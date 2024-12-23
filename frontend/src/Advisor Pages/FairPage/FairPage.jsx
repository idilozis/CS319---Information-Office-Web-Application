import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./FairPage.css";

const FairPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = "Kemal Çakır"; // Current user's name
  const userMenuRef = useRef(null);

  const [fairs, setFairs] = useState([
    {
      highSchool: "Izmir Fen Lisesi",
      city: "Izmir",
      date: "2024-12-18",
      time: "12:30",
      attendees: ["Kemal Çakır"],
    },
    {
      highSchool: "Ankara Gazi Lisesi",
      city: "Ankara",
      date: "2024-12-30",
      time: "10:00",
      attendees: [],
    },
    {
      highSchool: "Istanbul High School",
      city: "Istanbul",
      date: "2024-12-28",
      time: "14:00",
      attendees: [],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const today = new Date();

  const isBeforeSevenDays = (fairDate) => {
    const fairDateObj = new Date(fairDate);
    const differenceInTime = fairDateObj.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays > 7;
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

  const handleAddAttendee = (index) => {
    const selectedFair = fairs[index];

    if (!isBeforeSevenDays(selectedFair.date)) {
      setModalMessage("You can only add yourself before 7 days of the fair.");
      setModalVisible(true);
      return;
    }

    const isAlreadyRegistered = fairs.some(
      (fair, i) =>
        fair.date === selectedFair.date &&
        fair.attendees.includes(userName) &&
        i !== index
    );

    if (isAlreadyRegistered) {
      setModalMessage("You can only add yourself to one fair on the same date.");
      setModalVisible(true);
      return;
    }

    const updatedFairs = [...fairs];
    updatedFairs[index].attendees.push(userName);
    setFairs(updatedFairs);
  };

  const handleRemoveAttendee = (index) => {
    const selectedFair = fairs[index];

    if (!isBeforeSevenDays(selectedFair.date)) {
      setModalMessage("You can only remove yourself before 7 days of the fair.");
      setModalVisible(true);
      return;
    }

    const updatedFairs = [...fairs];
    updatedFairs[index].attendees = updatedFairs[index].attendees.filter(
      (attendee) => attendee !== userName
    );
    setFairs(updatedFairs);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage("");
  };
  
  const isDatePassed = (dateString) => {
    // Parse the input date string in "YYYY-MM-DD" format
    const [year, month, day] = dateString.split("-").map(Number);
    const fairDate = new Date(year, month - 1, day); // Create Date object for the fair date
  
    const today = new Date(); // Get today's date
    today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds
  
    return fairDate < today; // Check if the fair date is before today's date
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

        <h1>Fair Details</h1>
        <p className="note">
          Note: You can only add or remove yourself as an attendee before 7 days of the fair.
        </p>
        <div className="fair-table">
          <table>
            <thead>
              <tr>
                <th>High School</th>
                <th>City</th>
                <th>Date</th>
                <th>Time</th>
                <th>Attendees</th>
              </tr>
            </thead>
            <tbody>
                  {fairs.map((fair, fairIndex) => (
                    <tr key={fairIndex} className={isDatePassed(fair.date) ? "date-passed" : ""}>
                      <td>{fair.highSchool}</td>
                      <td>{fair.city}</td>
                      <td>{fair.date}</td>
                      <td>{fair.time}</td>
                      <td>
                        <ul>
                          {fair.attendees.map((attendee, attendeeIndex) => (
                            <li key={attendeeIndex}>{attendee}</li>
                          ))}
                        </ul>
                        {/* Only render buttons if the date has not passed */}
                        {!isDatePassed(fair.date) &&
                          (fair.attendees.includes(userName) ? (
                            <button
                              onClick={() => handleRemoveAttendee(fairIndex)}
                              style={{ marginTop: "5px" }}
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddAttendee(fairIndex)}
                              style={{ marginTop: "5px" }}
                            >
                              Add
                            </button>
                          ))}
                      </td>
                    </tr>
                  ))}
                </tbody>


          </table>
        </div>
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Action Not Allowed</h2>
              <p>{modalMessage}</p>
              <button onClick={closeModal} className="modal-close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FairPage;
