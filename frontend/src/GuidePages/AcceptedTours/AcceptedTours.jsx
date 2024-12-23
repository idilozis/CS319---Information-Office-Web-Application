import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./AcceptedTours.css";

// Define storage keys and current version
const TOURS_STORAGE_KEY = "acceptedTours";
const TOURS_VERSION_KEY = "acceptedToursVersion";
const REGISTRATIONS_STORAGE_KEY = "userRegistrations";
const CURRENT_VERSION = "1.1"; // Increment this when default tours change

// Define the default tours data outside the component
const defaultTours = [
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
  {
    id: 3,
    date: "23-01-2025",
    time: "9.00-13.00",
    highSchool: "Atatürk Anadolu Lisesi",
    counselor: "Anshuman Mullick",
    contact: {
      phone: null,
      email: "anshu@example.com",
    },
    studentCount: 75,
    attendees: ["Ali"],
  },
  {
    id: 4,
    date: "23-01-2025",
    time: "9.00-13.00",
    highSchool: "Atatürk Anadolu Lisesi",
    counselor: "Mehmet Globblus",
    contact: {
      phone: null,
      email: "memettu@example.com",
    },
    studentCount: 75,
    attendees: ["Ali"],
  },
  // Add more default tours here as needed
];

const AcceptedTours = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = "Kemal Çakır"; // Current user's name
  const userMenuRef = useRef(null);

  // Function to retrieve tours from localStorage or use default based on version
  const getInitialTours = () => {
    const storedVersion = localStorage.getItem(TOURS_VERSION_KEY);
    const storedTours = localStorage.getItem(TOURS_STORAGE_KEY);

    // If stored version matches current version and tours exist, use them
    if (storedTours && storedVersion === CURRENT_VERSION) {
      try {
        return JSON.parse(storedTours);
      } catch (error) {
        console.error("Failed to parse tours from localStorage:", error);
        // If parsing fails, proceed to reset localStorage
      }
    }

    // If no tours or version mismatch, use default and update localStorage
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(defaultTours));
    localStorage.setItem(TOURS_VERSION_KEY, CURRENT_VERSION);
    console.log("LocalStorage initialized with default tours.");

    return defaultTours;
  };

  // Function to retrieve user registrations from localStorage or initialize
  const getInitialRegistrations = () => {
    const storedRegistrations = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (storedRegistrations) {
      try {
        const parsed = JSON.parse(storedRegistrations);
        // Ensure it's an array
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error("Failed to parse user registrations from localStorage:", error);
      }
    }

    // If no registrations exist, initialize as empty array
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify([]));
    return [];
  };

  const [tours, setTours] = useState(getInitialTours);
  const [userRegistrations, setUserRegistrations] = useState(getInitialRegistrations);

  // Effect to update localStorage whenever tours state changes
  useEffect(() => {
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
  }, [tours]);

  // Effect to update localStorage whenever userRegistrations state changes
  useEffect(() => {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(userRegistrations));
  }, [userRegistrations]);

  // Effect to handle clicks outside the user menu to close it
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

  // Function to add the user as an attendee
  const handleAddAttendee = (tourId) => {
    const tourIndex = tours.findIndex((tour) => tour.id === tourId);
    if (tourIndex === -1) {
      alert("Selected tour does not exist.");
      return;
    }

    const selectedTour = tours[tourIndex];
    const maxAttendees = Math.ceil(selectedTour.studentCount / 60);

    if (selectedTour.attendees.length >= maxAttendees) {
      alert(
        `Maximum attendees reached for this tour. (1 attendee per 60 students)`
      );
      return;
    }

    // Prevent adding the same user multiple times
    if (selectedTour.attendees.includes(userName)) {
      alert("You have already added yourself to this tour.");
      return;
    }

    // Update the attendees for the selected tour
    const updatedTours = [...tours];
    updatedTours[tourIndex].attendees = [
      ...updatedTours[tourIndex].attendees,
      userName,
    ];
    setTours(updatedTours);

    // Update user registrations
    setUserRegistrations([...userRegistrations, tourId]);
  };

  // Function to remove the user from attendees
  const handleRemoveAttendee = (tourId) => {
    const tourIndex = tours.findIndex((tour) => tour.id === tourId);
    if (tourIndex === -1) {
      alert("Selected tour does not exist.");
      return;
    }

    const selectedTour = tours[tourIndex];

    // Check if the user is actually an attendee
    if (!selectedTour.attendees.includes(userName)) {
      alert("You are not an attendee of this tour.");
      return;
    }

    // Update the attendees for the selected tour
    const updatedTours = [...tours];
    updatedTours[tourIndex].attendees = updatedTours[tourIndex].attendees.filter(
      (attendee) => attendee !== userName
    );
    setTours(updatedTours);

    // Update user registrations
    setUserRegistrations(userRegistrations.filter((id) => id !== tourId));
  };

  // Function to check if the tour date has passed
  const isDatePassed = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number); // Parse `DD-MM-YYYY`
    const tourDate = new Date(year, month - 1, day); // Convert to `Date` object

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time for comparison (midnight of today)

    return tourDate < today; // Check if the tour date is before today
  };

  // Function to check if the tour is within the next seven days
  const isWithinSevenDays = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number); // Parse `DD-MM-YYYY`
    const tourDate = new Date(year, month - 1, day); // Convert to `Date` object
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set start of today, removing time component to compare only dates

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 6); // Set seven days from start of today, including today

    // Return true if tourDate is today or within the next 6 days
    return tourDate >= today && tourDate <= sevenDaysFromNow;
  };

  // Function to reset tours and user registrations (for testing purposes)
  const resetData = () => {
    // Retrieve current tours and determine which registrations are still valid
    const updatedTours = [...defaultTours];
    const updatedTourIds = updatedTours.map((tour) => tour.id);

    // Filter out user registrations for tours that no longer exist
    const validRegistrations = userRegistrations.filter((tourId) =>
      updatedTourIds.includes(tourId)
    );

    // Additionally, remove the user from attendees of tours that have been reset
    const synchronizedTours = updatedTours.map((tour) => {
      if (tour.attendees.includes(userName) && !validRegistrations.includes(tour.id)) {
        return {
          ...tour,
          attendees: tour.attendees.filter((attendee) => attendee !== userName),
        };
      }
      return tour;
    });

    // Update tours
    setTours(synchronizedTours);
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(synchronizedTours));
    localStorage.setItem(TOURS_VERSION_KEY, CURRENT_VERSION);
    console.log("Tours have been reset to default.");

    // Update user registrations
    setUserRegistrations(validRegistrations);
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(validRegistrations));
    console.log("User registrations have been synchronized.");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
          <button onClick={() => (window.location.href = "/api/login/")}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* User Menu */}
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
            {userName}
          </div>
          {menuVisible && (
            <div className="dropdown-menu">
              <button onClick={() => alert("Go to Settings")}>Settings</button>
              <button
                onClick={() => (window.location.href = "/api/login/")}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Page Header */}
        <h1>Tour Details</h1>

        {/* Tours Table */}
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
              {tours.map((tour) => {
                const userIsAttendee = tour.attendees.includes(userName);
                const withinSevenDays = isWithinSevenDays(tour.date);
                const canRemove = !withinSevenDays;

                return (
                  <tr
                    key={tour.id} // Use unique identifier for key
                    className={isDatePassed(tour.date) ? "date-passed" : ""}
                  >
                    <td>{tour.date}</td>
                    <td>{tour.time}</td>
                    <td>{tour.highSchool}</td>
                    <td>{tour.counselor}</td>
                    <td>
                      <div>
                        {tour.contact.phone ? (
                          <span>📞 {tour.contact.phone}</span>
                        ) : (
                          <span>📞 N/A</span>
                        )}
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
                      {/* Add Yourself Button */}
                      {!userIsAttendee &&
                        !isDatePassed(tour.date) &&
                        tour.attendees.length <
                          Math.ceil(tour.studentCount / 60) && (
                          <button
                            onClick={() => handleAddAttendee(tour.id)}
                            style={{ marginTop: "5px" }}
                          >
                            Add Yourself
                          </button>
                        )}

                      {/* Remove Yourself Button */}
                      {userIsAttendee && (
                        <button
                          onClick={() => handleRemoveAttendee(tour.id)}
                          className={
                            canRemove
                              ? "remove-button"
                              : "remove-button disabled"
                          }
                          disabled={!canRemove}
                          title={
                            canRemove
                              ? "Remove yourself from this tour"
                              : "Cannot remove within seven days of the tour"
                          }
                        >
                          Remove Yourself
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcceptedTours;
