import React, { useState, useEffect } from "react"; // Added useEffect
import { Link } from "react-router-dom";
import "./GiveFeedbackPage.css"; // CSS for this page
import axios from "axios"; // Added axios for API calls

const GiveFeedbackPage = () => {
  const [cities, setCities] = useState([]); // State for cities fetched from the database
  const [highSchools, setHighSchools] = useState([]); // State for high schools fetched from the database
  const [selectedCity, setSelectedCity] = useState(""); // State for city selection
  const [selectedHighSchool, setSelectedHighSchool] = useState(""); // State for high school selection

  // Fetch cities when the component mounts
  useEffect(() => {
    axios
      .get("/api/cities/")
      .then((response) => {
        console.log("Cities from API:", response.data);
        setCities(response.data);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  // Function to handle city selection and fetch corresponding high schools
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    // Fetch high schools for the selected city
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");
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
            <Link to="/api/apply_hs_tour/">Apply HS Tour</Link>
          </li>
          <li>
            <Link to="/api/apply_ind_tour/">Apply Ind. Tour</Link>
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
        <header className="give-feedback-header">
          <h1>Welcome To IOS</h1>
        </header>
        <div className="give-feedback-form-container">
          <h2>Guest (Counselor) Give Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="give-feedback-form-group">
              <label htmlFor="name">Name-Surname:</label>
              <input type="text" id="name" placeholder="John Doe" />
            </div>

            {/* City and High School Selection */}
            <div className="give-feedback-form-group">
              <label htmlFor="city">City:</label>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
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
              <label>
                <input type="checkbox" /> High School
              </label>
              <label>
                <input type="checkbox" /> Individual
              </label>
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="date">Tour Date:</label>
              <input type="date" id="date" />
            </div>
            <div className="give-feedback-form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                placeholder="Share your feedback here..."
              ></textarea>
            </div>
            <button type="submit" className="give-feedback-submit-button">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default GiveFeedbackPage;
