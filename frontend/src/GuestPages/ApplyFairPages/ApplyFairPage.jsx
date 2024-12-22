import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ApplyFairPage.css";
import axios from "axios";

const ApplyFairPage = () => {
  const [cities, setCities] = useState([]);
  const [highSchools, setHighSchools] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  // Fetch cities on mount
  useEffect(() => {
    axios
      .get("/api/cities/") // Adjust the endpoint if needed
      .then((response) => {
        setCities(response.data); // Array of city names
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  // Fetch high schools based on the selected city
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    if (city) {
      axios
        .get(`/api/highschools/${city}/`) // Adjust the endpoint if needed
        .then((response) => {
          setHighSchools(response.data); // Array of high school names
          setSelectedSchool(""); // Reset high school selection
        })
        .catch((error) =>
          console.error(`Error fetching high schools for ${city}:`, error)
        );
    } else {
      setHighSchools([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      contact_email: document.getElementById("email").value,
      city: selectedCity,
      highschool_name: selectedSchool,
      additional_notes: document.getElementById("notes").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
    };

    try {
      const response = await axios.post("/api/submit_university_fair/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 3000);

        // Reset form fields
        setSelectedCity("");
        setSelectedSchool("");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("notes").value = "";
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
      } else {
        alert("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="apply-fair-container">
      {/* Sidebar */}
      <aside className="apply-fair-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="apply-fair-menu">
          <li>
            <a href="/api/guest_dashboard/" className="menu-link">
              Home
            </a>
          </li>
          <li className="active">
            <Link to="/api/apply_fair/">Apply for Fair</Link>
          </li>
          <li>
            <Link to="/api/apply_hs_tour/">Apply for HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply for Ind. Tour</Link>
          </li>
          <li>
            <Link to="/api/give_feedback/">Give Feedback</Link>
          </li>
        </ul>
        <footer className="apply-fair-footer">
          <Link to="/api/contact_us/" className="apply-fair-contact-link">
            Contact Us
          </Link>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="apply-fair-main-content">
        <div className="apply-fair-form-container">
          <h2>Apply for University Fair</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="apply-fair-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>

            {/* Email */}
            <div className="apply-fair-form-group">
              <label htmlFor="email">Contact E-mail:</label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>

            {/* City Selection */}
            <div className="apply-fair-form-group">
              <label htmlFor="city">City:</label>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                required
              >
                <option value="">Choose a City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* High School Selection */}
            <div className="apply-fair-form-group">
              <label htmlFor="highschoolName">High School Name:</label>
              <select
                id="highschoolName"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                disabled={!selectedCity}
                required
              >
                <option value="">
                  {selectedCity
                    ? "Choose a High School"
                    : "Select a City First"}
                </option>
                {highSchools.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="apply-fair-form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                min={new Date().toISOString().split("T")[0]} // Ensure future dates only
                required
              />
            </div>

            {/* Time */}
            <div className="apply-fair-form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                required
              />
            </div>

            {/* Additional Notes */}
            <div className="apply-fair-form-group">
              <label htmlFor="notes">Additional Notes:</label>
              <textarea
                id="notes"
                placeholder="Add any additional information here."
              ></textarea>
            </div>

            <button type="submit" className="apply-fair-submit-button">
              Submit
            </button>
          </form>
        </div>

        {/* Popup Message */}
        {popupVisible && (
          <div className="popup-message">
            Your application has been submitted successfully!
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplyFairPage;
