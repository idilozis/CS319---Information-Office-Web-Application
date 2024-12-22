import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GiveFeedbackPage.css";
import axios from "axios";

const GiveFeedbackPage = () => {
  const [cities, setCities] = useState([]);
  const [highSchools, setHighSchools] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHighSchool, setSelectedHighSchool] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTourType, setSelectedTourType] = useState("");

  useEffect(() => {
    axios
      .get("/api/cities/")
      .then((response) => {
        console.log("Cities from API:", response.data);
        setCities(response.data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    axios
      .get(`/api/highschools/${city}/`)
      .then((response) => {
        console.log(`High schools in ${city}:`, response.data);
        setHighSchools(response.data);
        setSelectedHighSchool(""); // Reset high school selection
      })
      .catch((error) =>
        console.error(`Error fetching high schools for ${city}:`, error)
      );
  };

  const handleTourTypeChange = (type) => {
    setSelectedTourType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect feedback data
    const feedbackData = {
      name: document.getElementById("name").value,
      city: selectedCity,
      highschool: selectedHighSchool,
      tour_type: selectedTourType,
      tour_date: document.getElementById("date").value,
      feedback: document.getElementById("feedback").value,
    };

    // Send data to the backend
    axios
      .post("/api/submit_feedback/", feedbackData)
      .then((response) => {
        console.log("Feedback submitted:", response.data);
        setPopupVisible(true);

        // Clear form fields
        setSelectedCity("");
        setSelectedHighSchool("");
        setSelectedTourType("");
        document.getElementById("name").value = "";
        document.getElementById("feedback").value = "";
        document.getElementById("date").value = "";

        setTimeout(() => setPopupVisible(false), 3000); // Hide popup after 3 seconds
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  return (
    <div className="give-feedback-container">
      {/* Sidebar */}
      <aside className="give-feedback-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="give-feedback-menu">
          <li>
            <a href="/api/guest_dashboard/" className="menu-link">
              Home
            </a>
          </li>
          <li>
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li>
            <Link to="/api/apply_hs_tour/">Apply for HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply for Ind. Tour</Link>
          </li>
          <li className="active">
            <Link to="/api/give_feedback/">Give Feedback</Link>
          </li>
        </ul>
        <footer className="give-feedback-footer">
          <Link to="/api/contact_us/">Contact Us</Link>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="give-feedback-main-content">
        <div className="give-feedback-form-container">
          <h2>Give Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="give-feedback-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>

            {/* City and High School Selection */}
            <div className="give-feedback-form-group">
              <label htmlFor="city">City:</label>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                required
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="give-feedback-form-group">
              <label htmlFor="highschool">High School:</label>
              <select
                id="highschool"
                value={selectedHighSchool}
                onChange={(e) => setSelectedHighSchool(e.target.value)}
                disabled={!selectedCity}
                required
              >
                <option value="" disabled>
                  Select High School
                </option>
                {highSchools.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            <div className="give-feedback-form-group">
              <label htmlFor="tour-type">Tour Type:</label>
              <div className="tour-type-options">
                <label>
                  <input
                    type="radio"
                    name="tourType"
                    value="High School"
                    checked={selectedTourType === "High School"}
                    onChange={() => handleTourTypeChange("High School")}
                  />
                  High School
                </label>
                <label>
                  <input
                    type="radio"
                    name="tourType"
                    value="Individual"
                    checked={selectedTourType === "Individual"}
                    onChange={() => handleTourTypeChange("Individual")}
                  />
                  Individual
                </label>
              </div>
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="date">Tour Date:</label>
              <input type="date" id="date" required />
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                placeholder="Share your feedback here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="give-feedback-submit-button">
              Submit
            </button>
          </form>
        </div>

        {/* Popup Message */}
        {popupVisible && (
          <div className="popup-message">Thank you for your feedback!</div>
        )}
      </main>
    </div>
  );
};

export default GiveFeedbackPage;
