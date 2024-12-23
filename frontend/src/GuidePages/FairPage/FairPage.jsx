import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./FairPage.css";

// Define storage keys and current version
const FAIRS_STORAGE_KEY = "fairsData";
const FAIRS_VERSION_KEY = "fairsDataVersion";
const USER_FAIR_REGISTRATIONS_KEY = "userFairRegistrations";
const CURRENT_VERSION = "1.1"; // Increment this when default fairs change

// Define the default fairs data outside the component
const defaultFairs = [
  {
    id: 1,
    highSchool: "Izmir Fen Lisesi",
    city: "Izmir",
    date: "18-12-2024",
    time: "12:30",
    attendees: ["Kemal Çakır"],
  },
  {
    id: 2,
    highSchool: "Ankara Gazi Lisesi",
    city: "Ankara",
    date: "18-12-2024",
    time: "10:00",
    attendees: ["Kemal Çakır"],
  },
  {
    id: 3,
    highSchool: "Tofaş Fen Lisesi",
    city: "Bursa",
    date: "19-12-2024",
    time: "14:00",
    attendees: ["Kemal Çakır"],
  },
  {
    id: 4,
    highSchool: "Adana Fen Lisesi",
    city: "Adana",
    date: "01-01-2025",
    time: "14:00",
    attendees: [],
  },
  {
    id: 5,
    highSchool: "Ankara Pursaklar Fen Lisesi",
    city: "Ankara",
    date: "01-01-2024",
    time: "14:00",
    attendees: ["Kemal Çakır"],
  },
  {
    id: 6,
    highSchool: "Prof. Dr. Aziz Sancar Fen Lisesi",
    city: "Ankara",
    date: "28-12-2024",
    time: "14:00",
    attendees: [],
  },
  // Add more default fairs here as needed
];

const FairPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const userName = "Kemal Çakır"; // Current user's name
  const userMenuRef = useRef(null);

  // Function to retrieve fairs from localStorage or use default based on version
  const getInitialFairs = () => {
    const storedVersion = localStorage.getItem(FAIRS_VERSION_KEY);
    const storedFairs = localStorage.getItem(FAIRS_STORAGE_KEY);

    // If stored version matches current version and fairs exist, use them
    if (storedFairs && storedVersion === CURRENT_VERSION) {
      try {
        return JSON.parse(storedFairs);
      } catch (error) {
        console.error("Failed to parse fairs from localStorage:", error);
        // If parsing fails, proceed to reset localStorage
      }
    }

    // If no fairs or version mismatch, use default and update localStorage
    localStorage.setItem(FAIRS_STORAGE_KEY, JSON.stringify(defaultFairs));
    localStorage.setItem(FAIRS_VERSION_KEY, CURRENT_VERSION);
    console.log("LocalStorage initialized with default fairs.");

    return defaultFairs;
  };

  // Function to retrieve user fair registrations from localStorage or initialize
  const getInitialUserRegistrations = () => {
    const storedRegistrations = localStorage.getItem(USER_FAIR_REGISTRATIONS_KEY);
    if (storedRegistrations) {
      try {
        const parsed = JSON.parse(storedRegistrations);
        // Ensure it's an array
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        console.error("Failed to parse user fair registrations from localStorage:", error);
      }
    }

    // If no registrations exist, initialize as empty array
    localStorage.setItem(USER_FAIR_REGISTRATIONS_KEY, JSON.stringify([]));
    return [];
  };

  const [fairs, setFairs] = useState(getInitialFairs);
  const [userFairRegistrations, setUserFairRegistrations] = useState(getInitialUserRegistrations);

  // Effect to update localStorage whenever fairs state changes
  useEffect(() => {
    localStorage.setItem(FAIRS_STORAGE_KEY, JSON.stringify(fairs));
  }, [fairs]);

  // Effect to update localStorage whenever userFairRegistrations state changes
  useEffect(() => {
    localStorage.setItem(USER_FAIR_REGISTRATIONS_KEY, JSON.stringify(userFairRegistrations));
  }, [userFairRegistrations]);

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
  const handleAddAttendee = (fairId) => {
    const fairIndex = fairs.findIndex((fair) => fair.id === fairId);
    if (fairIndex === -1) {
      alert("Selected fair does not exist.");
      return;
    }

    const selectedFair = fairs[fairIndex];

    // Check if the user is already registered for another fair on the same date
    const isAlreadyRegistered = fairs.some(
      (fair) =>
        fair.date === selectedFair.date &&
        fair.attendees.includes(userName) &&
        fair.id !== fairId
    );

    if (isAlreadyRegistered) {
      alert("You can only add yourself to one fair on the same date.");
      return;
    }

    // Prevent adding the same user multiple times to the same fair
    if (selectedFair.attendees.includes(userName)) {
      alert("You have already added yourself to this fair.");
      return;
    }

    // Update the attendees for the selected fair
    const updatedFairs = [...fairs];
    updatedFairs[fairIndex].attendees.push(userName);
    setFairs(updatedFairs);

    // Update user fair registrations
    setUserFairRegistrations([...userFairRegistrations, fairId]);
  };

  // Function to remove the user from attendees
  const handleRemoveAttendee = (fairId) => {
    const fairIndex = fairs.findIndex((fair) => fair.id === fairId);
    if (fairIndex === -1) {
      alert("Selected fair does not exist.");
      return;
    }

    const selectedFair = fairs[fairIndex];

    // Check if the user is actually an attendee
    if (!selectedFair.attendees.includes(userName)) {
      alert("You are not an attendee of this fair.");
      return;
    }

    // Check if removal is allowed
    const canRemove = !isDatePassed(selectedFair.date) && !isWithinSevenDays(selectedFair.date);
    if (!canRemove) {
      // Determine the reason
      if (isDatePassed(selectedFair.date)) {
        alert("Cannot remove yourself from a past fair.");
      } else if (isWithinSevenDays(selectedFair.date)) {
        alert("Cannot remove yourself within seven days of the fair.");
      }
      return;
    }

    // Update the attendees for the selected fair
    const updatedFairs = [...fairs];
    updatedFairs[fairIndex].attendees = updatedFairs[fairIndex].attendees.filter(
      (attendee) => attendee !== userName
    );
    setFairs(updatedFairs);

    // Update user fair registrations
    setUserFairRegistrations(userFairRegistrations.filter((id) => id !== fairId));
  };

  // Function to check if the fair date has passed or is today
  const isDatePassed = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number); // Parse `DD-MM-YYYY` format
    const fairDate = new Date(year, month - 1, day); // Convert to Date object

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight to ignore time

    return fairDate <= today; // Check if the fair date is before or equal to today
  };

  // Helper function to check if the fair is within the next seven days
  const isWithinSevenDays = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number); // Parse `DD-MM-YYYY`
    const fairDate = new Date(year, month - 1, day); // Convert to Date object
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set start of today, removing time component to compare only dates

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 6); // Set seven days from start of today, including today

    // Return true if fairDate is today or within the next 6 days
    return fairDate >= today && fairDate <= sevenDaysFromNow;
  };

  // Function to reset fairs and user registrations (for testing purposes)
  const resetData = () => {
    // Retrieve current fairs and determine which registrations are still valid
    const updatedFairs = [...defaultFairs];
    const updatedFairIds = updatedFairs.map((fair) => fair.id);

    // Filter out user registrations for fairs that no longer exist
    const validRegistrations = userFairRegistrations.filter((fairId) =>
      updatedFairIds.includes(fairId)
    );

    // Additionally, remove the user from attendees of fairs that have been reset
    const synchronizedFairs = updatedFairs.map((fair) => {
      if (fair.attendees.includes(userName) && !validRegistrations.includes(fair.id)) {
        return {
          ...fair,
          attendees: fair.attendees.filter((attendee) => attendee !== userName),
        };
      }
      return fair;
    });

    // Update fairs
    setFairs(synchronizedFairs);
    localStorage.setItem(FAIRS_STORAGE_KEY, JSON.stringify(synchronizedFairs));
    localStorage.setItem(FAIRS_VERSION_KEY, CURRENT_VERSION);
    console.log("Fairs have been reset to default.");

    // Update user fair registrations
    setUserFairRegistrations(validRegistrations);
    localStorage.setItem(USER_FAIR_REGISTRATIONS_KEY, JSON.stringify(validRegistrations));
    console.log("User fair registrations have been synchronized.");
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
        <h1>Fair Details</h1>

        {/* Fairs Table */}
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
              {fairs.map((fair) => {
                const userIsAttendee = fair.attendees.includes(userName);
                const canRemove = !isDatePassed(fair.date) && !isWithinSevenDays(fair.date);

                return (
                  <tr
                    key={fair.id} // Use unique identifier for key
                    className={isDatePassed(fair.date) ? "date-passed" : ""}
                  >
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
                      {/* Add Yourself Button */}
                      {!isDatePassed(fair.date) && !userIsAttendee && (
                        <button
                          onClick={() => handleAddAttendee(fair.id)}
                          style={{ marginTop: "5px" }}
                        >
                          Add Yourself
                        </button>
                      )}

                      {/* Remove Yourself Button - Option B: Hide the button */}
                      {userIsAttendee && canRemove && (
                        <button
                          onClick={() => handleRemoveAttendee(fair.id)}
                          className="remove-button"
                          title="Remove yourself from this fair"
                          style={{ marginTop: "5px" }}
                        >
                          Remove Yourself
                        </button>
                      )}
                      {/* Informational Message when button is hidden */}
                      {userIsAttendee && !canRemove && (
                        <div
                          className="remove-info"
                          style={{
                            marginTop: "5px",
                            color: "#6c757d",
                            fontSize: "0.9em",
                          }}
                        >
                          {isDatePassed(fair.date)
                            ? "Cannot remove yourself from a past fair."
                            : "Cannot remove yourself within seven days of the fair."}
                        </div>
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

// Helper function to check if the fair is within the next seven days
const isWithinSevenDays = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number); // Parse `DD-MM-YYYY`
  const fairDate = new Date(year, month - 1, day); // Convert to `Date` object
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set start of today, removing time component to compare only dates

  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 6); // Set seven days from start of today, including today

  // Return true if fairDate is today or within the next 6 days
  return fairDate >= today && fairDate <= sevenDaysFromNow;
};

export default FairPage;
