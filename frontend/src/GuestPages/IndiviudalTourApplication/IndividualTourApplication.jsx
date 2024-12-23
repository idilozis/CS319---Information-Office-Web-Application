import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./IndividualTourApplication.css";
import axios from "axios";

const IndividualTourApplication = () => {
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [cities, setCities] = useState([]);
  const [highSchools, setHighSchools] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHighSchool, setSelectedHighSchool] = useState("");
  const [popupVisible, setPopupVisible] = useState(false); // Popup state

  useEffect(() => {
    axios
      .get("/api/cities/")
      .then((response) => {
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
        setHighSchools(response.data);
        setSelectedHighSchool("");
      })
      .catch((error) =>
        console.error(`Error fetching high schools for ${city}:`, error)
      );
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(currentDate.getDate() + 14);

    setDate(e.target.value);

    if (selectedDate < twoWeeksLater) {
      setDateError("Date must be at least 2 weeks in the future.");
    } else {
      setDateError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById("name").value,
      city: selectedCity,
      highschool: selectedHighSchool,
      contact_phone: document.getElementById("phone").value,
      contact_email: document.getElementById("email").value,
      major_of_interest: document.getElementById("major").value,
      additional_notes: document.getElementById("notes").value,
      date: date,
    };
  
    try {
      const response = await axios.post("/api/submit_individual_tour/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        setPopupVisible(true); 
        setTimeout(() => setPopupVisible(false), 3000); 
  
        // Reset form fields
        setSelectedCity("");
        setSelectedHighSchool("");
        setDate("");
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("major").value = "";
        document.getElementById("notes").value = "";
      } else {
        alert("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  

  return (
    <div className="individual-tour-application-container">
      <aside className="individual-tour-application-sidebar">
        <h2>Bilkent Information Office System</h2>
        <ul className="individual-tour-application-menu">
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
          <li className="active">
            <Link to="/api/apply_ind_tour/">Apply for Ind. Tour</Link>
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
        <div className="individual-tour-application-form-container">
          <h2>Apply Individual Tour</h2>
          <form onSubmit={handleSubmit}>
            <div className="individual-tour-application-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>

            {/* City Selection */}
            <div className="individual-tour-application-form-group">
              <label htmlFor="city">City:</label>
              <select id="city" value={selectedCity} onChange={handleCityChange}>
                <option value="" disabled>
                  Choose City
                </option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* High School Selection */}
            <div className="individual-tour-application-form-group">
              <label htmlFor="highschool">High School:</label>
              <select
                id="highschool"
                value={selectedHighSchool}
                onChange={(e) => setSelectedHighSchool(e.target.value)}
                disabled={!selectedCity}
              >
                <option value="" disabled>
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

      {/* Popup Message */}
      {popupVisible && (
        <div className="popup-message">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default IndividualTourApplication;
