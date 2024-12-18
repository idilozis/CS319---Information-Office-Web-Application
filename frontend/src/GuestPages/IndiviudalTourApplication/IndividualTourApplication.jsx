import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IndividualTourApplication.css";

const IndividualTourApplication = () => {
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // State for city selection
  const [highSchools, setHighSchools] = useState([]); // State for High Schools list

  const cityHighSchoolMapping = {
    Ankara: ["TED Ankara", "Ankara High School", "Bilkent High School"],
    Istanbul: ["Istanbul International School", "Galatasaray High School"],
    Izmir: ["Izmir Science High School", "Izmir High School"],
  };

  // Function to validate the date
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(currentDate.getDate() + 14); // 2 weeks from today

    setDate(e.target.value);

    if (selectedDate < twoWeeksLater) {
      setDateError("Date must be at least 2 weeks in the future.");
    } else {
      setDateError("");
    }
  };

  // Handle city selection
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setHighSchools(cityHighSchoolMapping[city] || []); // Set high schools based on city
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateError) {
      alert("Please fix the validation errors before submitting.");
    } else {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="individual-tour-application-container">
      <aside className="individual-tour-application-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="individual-tour-application-menu">
          <li>
          <a href="/api/guest_dashboard/" className="menu-link">Home</a>
          </li>
          <li>
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li>
            <Link to="/api/apply_hs_tour/">Apply HS Tour</Link>
          </li>
          <li className="active">
            <Link to="/api/apply_ind_tour/">Apply Ind. Tour</Link>
          </li>
          <li>
            <Link to="/api/give_feedback/">Give Feedback</Link>
          </li>
          <li>
            <Link to="/api/contact_us/">Contact Us</Link>
          </li>
        </ul>
      </aside>
      <main className="individual-tour-application-main-content">
        <header className="individual-tour-application-header">
          <h1>Welcome To IOS</h1>
        </header>
        <div className="individual-tour-application-form-container">
          <h2>Apply Individual Tour</h2>
          <form onSubmit={handleSubmit}>
            <div className="individual-tour-application-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>

            {/* City and High School Selection */}
            <div className="individual-tour-application-form-group">
              <label htmlFor="city">City:</label>
              <select id="city" value={selectedCity} onChange={handleCityChange}>
                <option value="" disabled>
                  Choose City
                </option>
                <option value="Ankara">Ankara</option>
                <option value="Istanbul">Istanbul</option>
                <option value="Izmir">Izmir</option>
              </select>
            </div>

            <div className="individual-tour-application-form-group">
              <label htmlFor="highschool">High School:</label>
              <select id="highschool" disabled={!selectedCity}>
                <option value="" disabled selected>
                  Choose High School
                </option>
                {highSchools.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            <div className="individual-tour-application-form-group">
              <label htmlFor="phone">Contact Phone:</label>
              <input type="text" id="phone" placeholder="0123 456 78 90" />
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="email">Contact e-mail:</label>
              <input type="email" id="email" placeholder="johndoe@example.com" />
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="major">Major of interest:</label>
              <input
                type="text"
                id="major"
                placeholder="I am interested in Computer Science and technology."
              />
            </div>
            <div className="individual-tour-application-form-group">
              <label htmlFor="notes">Additional notes:</label>
              <textarea
                id="notes"
                placeholder="Requires a guide who knows sign language if possible."
              ></textarea>
            </div>

            {/* Date Selection */}
            <div className="individual-tour-application-form-group">
              <label htmlFor="tourDate">Tour Date:</label>
              <input
                type="date"
                id="tourDate"
                value={date}
                onChange={handleDateChange}
              />
              {dateError && (
                <p style={{ color: "red", fontSize: "0.9rem" }}>{dateError}</p>
              )}
            </div>

            <button
              type="submit"
              className="individual-tour-application-submit-button"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default IndividualTourApplication;
