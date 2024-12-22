import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./AcceptedTours.css";

const AcceptedTours = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = "Kemal Çakır"; // Current user's name

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
        attendees: ["Idil"],
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
        attendees: [],
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
        attendees: ["Ali"],
      },
  ]);
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

  const handleAddAttendee = (index) => {
    const selectedTour = tours[index];
    const maxAttendees = Math.ceil(selectedTour.studentCount / 60);

    if (selectedTour.attendees.length >= maxAttendees) {
      alert(
        `Maximum attendees reached for this tour. (1 attendee per 60 students)`
      );
      return;
    }

    // Update the attendees for the selected tour
    setTours((prevTours) => {
      const updatedTours = [...prevTours];
      updatedTours[index].attendees = [...updatedTours[index].attendees, userName];
      return updatedTours;
    });
  };

  const isDatePassed = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number); // Parse `DD-MM-YYYY`
    const tourDate = new Date(year, month - 1, day); // Convert to `Date` object
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time for comparison (midnight of today)
  
    return tourDate < today; // Check if the tour date is before today
  };
  
  

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul>
          <li>
            <Link to="/api/guide_dashboard" className="sidebar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/api/accepted_tours" className="sidebar-link">
              Tours
            </Link>
          </li>
          <li>
            <Link to="/api/guide_fairs" className="sidebar-link">
              Fairs
            </Link>
          </li>
          <li>
            <Link to="/api/responsible_advisors" className="sidebar-link">
              Responsible Advisors
            </Link>
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
              <button onClick={() => alert("Go to Settings")}>Settings</button>
              <button onClick={() => (window.location.href = "/api/login/")}>Logout</button>
            </div>
          )}
        </div>

        <h1>Tour Details</h1>
        <div className="tour-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>High School</th>
                <th>Counselor</th>
                <th>Contact Info</th>
                <th>Student Count</th>
                <th>Attendees</th>
              </tr>
            </thead>
            <tbody>
                  {tours.map((tour, tourIndex) => (
                    <tr key={tourIndex} className={isDatePassed(tour.date) ? "date-passed" : ""}>
                      <td>{tour.date}</td>
                      <td>{tour.time}</td>
                      <td>{tour.highSchool}</td>
                      <td>{tour.counselor}</td>
                      <td>
                        <div>
                          {tour.contact.phone ? <span>📞 {tour.contact.phone}</span> : <span>📞 N/A</span>}
                        </div>
                        <div>✉️ {tour.contact.email}</div>
                      </td>
                      <td>{tour.studentCount}</td>
                      <td>
                        <ul>
                          {tour.attendees.map((attendee, attendeeIndex) => (
                            <li key={attendeeIndex}>{attendee}</li>
                          ))}
                        </ul>
                        {/* Render the button only if the user is not already in attendees, there is space, and the date hasn't passed */}
                        {!isDatePassed(tour.date) &&
                          !tour.attendees.includes(userName) &&
                          tour.attendees.length < Math.ceil(tour.studentCount / 60) && (
                            <button
                              onClick={() => handleAddAttendee(tourIndex)}
                              style={{ marginTop: "5px" }}
                            >
                              Add Yourself
                            </button>
                          )}
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

export default AcceptedTours;
